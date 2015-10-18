Template.effectsTemplate.onRendered(function() {
      SC.initialize({
        client_id: 'bf89668c65bdb0c524df6302bc092829',
        redirect_uri: 'http://localhost:3000/_oauth/soundcloud?close'
      });
      $('#startRecording a').click(function(e) {
        $('#startRecording').hide();
        $('#stopRecording').show();
        e.preventDefault();
        SC.record({
          progress: function(ms, avgPeak) {
            updateTimer(ms);
          }
        });
      });

      $('#stopRecording a').click(function(e) {
        e.preventDefault();
        $('#stopRecording').hide();
        $('#playBack').show();
        $('#upload').show();
        SC.recordStop();
      });
      $('#playBack a').click(function(e) {
        e.preventDefault();
        updateTimer(0);
        SC.recordPlay({
          progress: function(ms) {
            updateTimer(ms);
          }
        });
      });
      $('#upload').click(function(e) {
            e.preventDefault();
            SC.connect({
              connected: function() {
                $('.status').html('Uploading...');
                SC.recordUpload({
                  track: {
                    title: 'My Codecademy Recording',
                    sharing: 'private'
                  }
                }, function(track) {
                  $('.status').html("Uploaded: <a href='" + track.permalink_url + "'>" + track.permalink_url + "</a>");
                });
              }
            });
})
})
