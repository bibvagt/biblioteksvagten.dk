<?php

/**
 * Load question.
 *
 * @param int $questionId
 *   The ID of the question to load the log for.
 *
 * @return array
 *   An array of chat log object keyed by timestamp.
 */
function chatty_load_question($questionId) {
  $query = db_select('chatty_questions');

  $query->addField('chatty_questions', 'id');
  $query->addField('chatty_questions', 'authorName');
  $query->addField('chatty_questions', 'authorEmail');
  $query->addField('chatty_questions', 'subject');
  $query->addField('chatty_questions', 'status');
  $query->addField('chatty_questions', 'consultant');
  $query->addField('chatty_questions', 'url');
  $query->addField('chatty_questions', 'agencyId');
  $query->addField('chatty_questions', 'agencyMail');
  $query->addField('chatty_questions', 'lastHeartbeatAt');
  $query->addField('chatty_questions', 'createdAt');
  $query->addField('chatty_questions', 'updatedAt');

  $query->condition('chatty_questions.id', $questionId, '=');

  $result = $query->execute()->fetchObject();

  // Grab the client by the agency ID.
  $client = vopros_question_client_load_by_agency($result->agencyId);
  unset($result->agencyId);

  if ($client) {
    $result->source = $client->label;
    $result->client = $client->client_id;
  }
  else {
    $result->source = 'Ukendt';
    $result->client = 0;
  }

  return $result;
}

/**
 * Load messages.
 *
 * @param int $questionId
 *   The ID of the question to load the log for.
 *
 * @return array
 *   An array of chat log object keyed by timestamp.
 */
function chatty_load_messages($questionId) {
  $query = db_select('chatty_messages');

  $query->addField('chatty_messages', 'id');
  $query->addField('chatty_messages', 'text');
  $query->addField('chatty_messages', 'sentFrom');
  $query->addField('chatty_messages', 'question');
  $query->addField('chatty_messages', 'createdAt');

  $query->condition('chatty_messages.question', $questionId, '=');

  return $query->execute()->fetchAll();
}

/**
 * Load message.
 *
 * @param int $messageId
 *   The ID of the question to load the log for.
 *
 * @return array
 *   An array of chat log object keyed by timestamp.
 */
function chatty_load_message($messageId) {
  $query = db_select('chatty_messages');

  $query->addField('chatty_messages', 'id');
  $query->addField('chatty_messages', 'text');
  $query->addField('chatty_messages', 'sentFrom');
  $query->addField('chatty_messages', 'question');
  $query->addField('chatty_messages', 'createdAt');

  $query->condition('chatty_messages.id', $messageId, '=');

  return $query->execute()->fetchObject();
}

/*
 * Status.
 * Returns 'open', 'closed'.
 */
function _chatty_status() {
  $status = 'closed';
  $hours = variable_get('chatty_hours');
  $readable_hours = json_decode($hours);
  $day_of_week = (int) date('w');
  $now_in_minutes = ((date('G') * 60) + date('i'));
  $today = new stdClass();

  if ($day_of_week === 0) {
    $day_of_week = 7;
  }

  $count = 1;
  foreach ($readable_hours as $readable_hour) {
    if ($count === $day_of_week) {
      $today = $readable_hour;
    }

    $count++;
  }

  if ($today->open !== NULL || $today->close !== NULL) {
    if (($today->open === NULL || $today->open <= $now_in_minutes) &&
        ($today->close === NULL || $today->close > $now_in_minutes)) {
      $status = 'open';
    }
  }

  return $status;
}

/**
 * Create vopros question.
 *
 * Just a helper wrapper.
 *
 * Params:
 * - $reason: required
 * - $subject: required
 * - $name: required
 * - $email: required
 * - $messages: required
 * - $fromUrl: required
 * - $agencyMail: required
 * - $agencyId: required
 * - $keepConsultant: optional
 * - $title: optional
 * - $consultantUid: optional
 */
function _create_vopros_question($reason, $subject, $name, $email, $messages, $fromUrl, $agencyMail, $clientId, $keepConsultant, $title, $consultantUid) {
  $default_values = array(
    'user_answer_preference' => 'mail',
    'channel' => 'chat',
    'client_id' => $clientId,
    'question_content' => t('Chat log:') . "\n" . $subject . "\n" . $messages,
    'user_name' => $name,
    'user_email' => $email,
    'question_usage' => 'other',
    'channel_data' => array(
      'from_url' => $fromUrl,
      'site_email' => $agencyMail,
    ),
  );

  if (!empty($title)) {
    $default_values['question_title'] = trim($title);
  }

  // Spam.
  if ($reason === 'spam') {
    $default_values['question_status'] = 'closed';
    $default_values['question_status_reason'] = 'spam';
  }

  // Answered.
  if ($reason === 'answered') {
    $default_values['question_title'] = t('Answered chat question');
    $default_values['question_status'] = 'answered';
    $default_values['user_answer_preference'] = 'chatty';
  }

  // Answer later.
  if ($reason === 'later') {
    $default_values['channel'] = 'mail';
    $default_values['question_status'] = 'active';

    if ($keepConsultant) {
      $default_values['uid'] = $consultantUid;
      $default_values['question_status'] = 'assigned';
    }
    else {
      // Release the question.
      $default_values['uid'] = 0;
    }

    // The question is still open, change the answer preference to allow editors
    // to contact the user by mail later.
    $default_values['user_answer_preference'] = 'mail';
  }

  $question = vopros_question_new($default_values);

  if (module_exists('vopros_editorial')) {
    $question_wrapper = entity_metadata_wrapper('vopros_question', $question);
    $question_wrapper->vopros_editorial = 2;
  }

  $question->save();
}

/**
 * Render a chat log in plain text.
 */
function _render_messages_in_plain_text($messages) {
  // Same as drupal_get_user_timezone() uses to get the system default.
  $timezone = variable_get('date_default_timezone', @date_default_timezone_get());
  $plain = array();

  foreach ($messages as $message) {
    $sentFrom = 'Ukendt';

    if ($message->sentFrom == 'admin') {
      $sentFrom = 'Biblioteksvagt';
    }
    if ($message->sentFrom == 'user') {
      $sentFrom = 'Bruger';
    }
    if ($message->sentFrom == 'system') {
      $sentFrom = t('System');
    }

    $plain[] = format_date($message->createdAt, 'custom', 'G:i', $timezone) . ' - ' . $sentFrom . ': ' . $message->text;
  }

  return implode("\n", $plain);
}

/**
 * Get a full user name from a profile.
 */
function _chatty_get_firstname($profile) {
  $wrapper = entity_metadata_wrapper('profile2', $profile);

  return $wrapper->vopros_user_first_name->value();
}

/**
 * Get questions by status.
 *
 * Params:
 * - $status_type: required
 * - $consultant_id: optional
 */
function chatty_get_questions_by_status($status_type, $consultant_id = false) {
  $query = db_select('chatty_questions');

  $query->addField('chatty_questions', 'id');
  $query->addField('chatty_questions', 'authorName');
  $query->addField('chatty_questions', 'authorEmail');
  $query->addField('chatty_questions', 'subject');
  $query->addField('chatty_questions', 'status');
  $query->addField('chatty_questions', 'consultant');
  $query->addField('chatty_questions', 'url');
  $query->addField('chatty_questions', 'agencyId');
  $query->addField('chatty_questions', 'agencyMail');
  $query->addField('chatty_questions', 'lastHeartbeatAt');
  $query->addField('chatty_questions', 'createdAt');
  $query->addField('chatty_questions', 'updatedAt');

  $query->condition('chatty_questions.status', $status_type, '=');

  // Filter only if a consultant ID is given. A null parameter (or no param)
  // does not filter on consultants.
  if ($consultant_id) {
    $query->condition('chatty_questions.consultant', $consultant_id, '=');
  }

  $results = $query->execute()->fetchAll();

  if (!empty($results)) {
    $int = 0;

    foreach ($results as $result) {

      // Grab the client by the agency ID.
      $client = vopros_question_client_load_by_agency($result->agencyId);
      unset($results[$int]->agencyId);

      if ($client) {
        $results[$int]->source = $client->label;
        $results[$int]->client = $client->client_id;
      }
      else {
        $results[$int]->source = 'Ukendt';
        $results[$int]->client = 0;
      }

      $int++;
    }
  }

  return $results;
}

/**
 * Get latest message.
 *
 * Params:
 * - $question_id: required
 */
function chatty_get_overdue_messages($question_id, $period = '-6 hour') {
  $ago = strtotime($period, time());

  $query = db_select('chatty_messages');

  $query->addField('chatty_messages', 'id');
  $query->addField('chatty_messages', 'text');
  $query->addField('chatty_messages', 'sentFrom');
  $query->addField('chatty_messages', 'question');
  $query->addField('chatty_messages', 'createdAt');
  $query->condition('createdAt', $ago, '<');

  $query->condition('chatty_messages.question', $question_id, '=');

  return $query->execute()->fetchAll();
}

/**
 * Close question.
 *
 * Params:
 * - questionId: required
 * - reason: required
 * - keepConsultant: optional
 * - title: optional
 */
function chatty_close_question($questionId, $reason, $keepConsultant = false, $title = false) {

  // Update the database.
  $updateArray = array(
    'reason' => $reason,
    'status' => 'complete',
    'updatedAt' => REQUEST_TIME,
  );

  if (!empty($keepConsultant)) {
    $updateArray['keepConsultant'] = $keepConsultant;
  }
  if (!empty($title)) {
    $updateArray['title'] = $title;
  }

  db_update('chatty_questions')
    ->fields($updateArray)
    ->condition('id', $questionId)
    ->execute();

  // Query the database, returning the updated question.
  $question = chatty_load_question($questionId);

  // Create a vopros question.
  $messages = chatty_load_messages($questionId);
  $messages_in_plain_text = _render_messages_in_plain_text($messages);

  _create_vopros_question(
    $reason,
    $question->subject,
    $question->authorName,
    $question->authorEmail,
    $messages_in_plain_text,
    $question->url,
    $question->agencyMail,
    $question->client,
    $keepConsultant,
    $title,
    $question->consultant
  );

  return $question;
}

function chatty_cleanup_overdue_questions() {
  $questions_to_close = array();
  $open_questions = chatty_get_questions_by_status('assigned');

  // Run through open questions and find out if the latest message, is more than 6 hours old.
  foreach ($open_questions as $open_question) {
    $messages = chatty_get_overdue_messages($open_question->id);

    if (!$messages) {
      continue;
    }

    $questions_to_close[] = $open_question->id;
  }

  foreach ($questions_to_close as $question_to_close) {
    chatty_close_question($question_to_close, 'answered');

    watchdog(
      'chatty',
      'Question ID: @question_id was converted to a answered question automatically.',
      array('@question_id' => $question_to_close),
      WATCHDOG_INFO
    );
  }

  return $questions_to_close;
}
