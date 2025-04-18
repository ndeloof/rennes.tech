        
var meetups = [
  {slug: "BreizhJUG", title: "BreizhJUG"},
  {slug: "Docker-Rennes", title: "Docker Rennes"},
  {slug: "RennesJS", title: "RennesJS"},
  {slug: "Golang-Rennes", title: "Golang Rennes"},
  {slug: "Software-Craftsmanship-Rennes", title: "Software Crafters Rennes"},
  {slug: "rennes-devops", title: "Rennes devops"},
  {slug: "Agile-Rennes", title: "Agile Rennes"},
  {slug: "AFUP-Rennes", title: "AFUP Rennes"},
  {slug: "ecoconception-de-services-numeriques-rennes", title: "Écoconception de services numériques Rennes"},
  {slug: "Flutter-Rennes", title: "Mobile Rennes"},
  {slug: "python-rennes", title: "Python Rennes"},
];


const events = [];

$.each(meetups, function(_index, meetup) {
  $("#icons").append(
    "<div class='icon'><a href='https://www.meetup.com/" + meetup.slug + "/'>"
    + "<img src='meetups/" + meetup.slug + ".png'/ title='" + meetup.title + "'></a></div>"
  );
  $.getScript("https://api.meetup.com/" + meetup.slug + "/events?fields=featured_photo&callback=addEvents");
});

const addEvents = function(json) {
	$.each(json.data, function() {
    let image = "placeholder.png";    
    if (this.featured_photo) {
      image = this.featured_photo.photo_link;
    }
    // console.log(this);

    if (typeof this.name === 'undefined') {
      return
    }
    
    let pos = 0;
    while (pos < events.length) {
      if (events[pos].time >= this.time) {
        break;
      }
      pos++;
    }
    events.splice(pos,0, this);
    // console.log("insert "+this.name+" at position " + pos);
    // console.log(events)

    $('#events li:eq(' + pos + ')').after(
          "<li class='col-md-4'>" 
    		+ "<div class='card mb-4 box-shadow'>"
        + "<img class='card-img-top' >"
    		+ "<img class='card-img-top' style='height: 180px; width: 100%; display: block;' src='"+ image + "'>"
    		+ "<div class='card-body'>"
            	+ "<h5 class='card-title'>" + this.name + "</h5>"
            	+ "<h6 class='card-subtitle'><i class='far fa-calendar'></i> "+this.local_date+"</h6>"
    		+ "<div class='card-text'>"
              + "<img src='meetups/" + this.group?.urlname + ".png' class='meetup-icon'/>"

            	+ this.description 
            	+ "</div>"
            	+ "<div class='d-flex justify-content-between align-items-center'>"
            	+ "<a href='" + this.link + "'>En savoir plus ...</a>"
        + "</div></div></div>"
        + "</li>");
  });
}
