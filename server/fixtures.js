if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Blackhawks latest title',
    url: 'http://www.nhl.com/ice/news.htm?id=782201&navid=DL|NHL|home'
  });

  Posts.insert({
    title: 'Stats',
    url: 'http://www.nhl.com/stats/?navid=nav-sts-main#'
  });

  Posts.insert({
    title: 'Schedule',
    url: 'http://www.nhl.com/ice/schedulebyweek.htm?navid=nav-sch-main#'
  });
}
