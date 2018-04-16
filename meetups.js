        
var meetups = [
  "BreizhJUG",
  "Docker-Rennes",
  "RennesJS",
  "AndroidRennes",
  "Golang-Rennes",
  "Software-Craftsmanship-Rennes",
  "Rennes-Jenkins-Area-Meetup",
  "rennes-devops",
  "Agile-Rennes"        
];


var events = [];

$.each(meetups, function() {
  $("#icons").append( "<div class='icon'><img src='meetups/"+this+".png'/></div>" );
  $.getScript("https://api.meetup.com/"+this+"/events?fields=featured_photo&callback=addEvents");
});

addEvents = function(json) {
	$.each(json.data, function() {
    var image = "placeholder.png";    
    if (this.featured_photo) {
      image = this.featured_photo.photo_link;
    }
    console.log(this);
    
    var pos = 0;
    while (pos < events.length) {
      if (events[pos].time >= this.time) {
        break;
      }
      pos++;
    }
    events.splice(pos,0, this);
    console.log("insert "+this.name+" at position " + pos);
    console.log(events)


    $('#events li:eq('+pos+')').after(
          "<li class='col-md-4'>" 
    		+ "<div class='card mb-4 box-shadow'>"
        + "<img class='card-img-top' >"
    		+ "<img class='card-img-top' style='height: 180px; width: 100%; display: block;' src='"+ image + "'>"
    		+ "<div class='card-body'>"
            	+ "<h5 class='card-title'>"+this.name+"</h5>"
            	+ "<h6 class='card-subtitle'><i class='far fa-calendar'></i> "+this.local_date+"</h6>"
    		+ "<div class='card-text'>"
              + "<img src='meetups/"+ this.group.urlname +".png' class='meetup-icon'/>"

            	+ this.description 
            	+ "</div>"
            	+ "<div class='d-flex justify-content-between align-items-center'>"
            	+ "<a href='"+this.link+"'>En savoir plus ...</a>"
        + "</div></div></div>"
        + "</li>");
  });
}