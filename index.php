<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Socket Connection</title>
  <link rel='stylesheet' href='css/style.css'>
</head>
<body>
    <div class='main_container'>
        <div class='dashboard_container'>
            <div class='logo_container'>
                <img src='utils/images/logo.png'></img>
            </div>
            <div>
                <div class='description_container'>
                    <p class='description_container_paragraph'>
                        Talk with other user by passing his personal code or talk with strangers!
                    </p>
                </div>
                <div class='personal_code_container'>
                    <div class='personal_code_title_container'>
                        <p class='personal_code_title_paragraph'>
                            Your personal code
                        </p>
                    </div>
                    <div class="personal_code_value_container">
                        <p class='personal_code_value_paragraph' id='personal_code_paragraph'>DDDDDD</p>
                        <button class='personal_code_copy_button' id='personal_code_copy_button'>
                            <img src='utils/images/copyButton.png'></img>
                        </button>
                    </div>
                </div>
                </div>
                <div class='personal_code_connecting_container'>
                    <p class='personal_code_connecting_paragraph'>Personal Code</p>
                    <div class='personal_code_connecting_input_container'>
                        <input class='personal_code_input' id='personal_code_input'></input>
                    </div>
                    <div class='personal_code_connecting_buttons_container'>
                        <button class='connecting_button' id='personal_code_chat_button'>
                            <img src='utils/images/chatButton.png' class='connecting_buttons_image'></img>
                        </button>
                        <button class='connecting_button' id='personal_code_video_button'>
                            <img src='utils/images/videoButton.png' class='connecting_buttons_image'></img>
                        </button>
                    </div>
                </div>
                <div class='stranger_connecting_container'>
                    <p class='stranger_title_container'>Stranger</p>
                    <div class='stranger_buttons_container'>
                        <button class='connecting_button' id='stranger_chat_button'>
                            <img src='utils/images/chatButton.png' class='connecting_buttons_image'></img>
                        </button>
                        <button class='connecting_button' id='stranger_video_button'>
                            <img src='utils/images/videoButton.png' class='connecting_buttons_image'></img>
                        </button>
                    </div>
                </div>
                <div class='checkbox_container'>
                    <div class='checkbox_connection' id='allow_strangers_checkbox'>
                        <img id='allow_strangers_checkbox_image' class='' src='./utils/images/check.png'></img>
                    </div>
                    <p class='checkbox_container_paragraph'>Allow connection from strangers</p>
                </div>
                <div class='dashboard_blur display_none' id='dashboard_blur'></div>
            </div>
        <div class='call_container'>
            <div class='videos_container'>
                <div id='video_placeholder' class='videos_placeholder'>
                    <img src='utils/images/logo.png'></img>
                </div>
                <video class='remote_video display_none' autoplay id='remote_video'></video>
                <div class='local_video_container'>
                    <video class='local_video' id='local_video' muted autoplay></video>
                </div>
                <div class='call_buttons_container display_none' id='call_buttons'>
                    <button class='call_button_small' id='mic_button'>
                        <img src='utils/images/mic.png' id='mic_button_image'></img>
                    </button>
                    <button class='call_button_small' id='camera_button'>
                        <img src='utils/images/camera.png' id='camera_button_image'></img>
                    </button>
                    <button class='call_button_large' id='hang_up_button'>
                        <img src='utils/images/hangUp.png'></img>
                    </button>
                    <button class='call_button_small' id='screen_sharing_button'>
                        <img src='utils/images/switchCameraScreenSharing.png'></img>
                    </button>
                    <button class='call_button_small' id='start_recording_button'>
                        <img src='utils/images/recordingStart.png'></img>
                    </button>
                </div>
                <div class='finish_chat_button_container display_none' id='finish_chat_button_container'>
                    <button class='call_button_large' id='finish_chat_call_button'>
                        <img src='utils/images/hangUp.png'></img>
                    </button>
                </div>
                <div class='video_recording_buttons_container display_none' id='video_recording_buttons'>
                    <button id='pause_recording_button'>
                        <img src='utils/images/pause.png'></img>
                    </button>
                    <button id='resume_recording_button' class='display_none'>
                        <img src='utils/images/resume.png'></img>
                    </button>
                    <button id='stop_recording_button'>
                        Stop recording
                    </button>
                </div>
            </div>
        </div>
        <div class='messenger_container'>
            <div class='messages_container' id='messages_container'></div>
            <div class='new_message_container display_none' id='new_message'>
                <input class='new_message_input' id='new_message_input' type='text' placeholder="Type your message..."></input>
                <button class='send_message_button' id='send_message_button'>
                    <img class='send_message_button_image' src='utils/images/sendMessageButton.png'></image>
                </button>
            </div>
        </div>
        <div id="dialog">

        </div>    
  </div>
  <script src="http://192.168.2.127:4000/socket.io/socket.io.js"></script>
  <script src='js/constants.js' type='module'></script>
  <script src='js/elements.js' type='module'></script>
  <script src='js/ui.js' type='module'></script>
  <script src='js/wss.js' type='module'></script>
  <script src='js/store.js' type='module'></script>
  <script src='js/webRTCHandler.js' type='module'></script>
  <script src='js/main.js' type='module'></script>
</body>
</html>