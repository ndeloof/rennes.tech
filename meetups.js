
var meetups = [
  { id: 'Docker-Quebec-Meetup', name: 'Docker Québec' },
  { id: 'AzureQC', name: 'Communauté Microsoft Azure Québec' },
  { id: 'QuebecCity-AWS-User-Group', name: 'Québec City AWS User Group' },
  { id: 'Kubernetes-Quebec', name: 'Kubernetes and Cloud Native Québec' },
  { id: 'Quebec-City-HashiCorp-User-Group', name: 'Quebec City HashiCorp User Group' },
  { id: 'Sitecore-User-Group-Quebec', name: 'Sitecore User Group Quebec' },
  { id: 'Quebec-Numerique', name: 'Québec Numérique' },
  { id: 'DotNet-Quebec', name: 'DotNet Quebec' }
];


var events = [];

$.each(meetups, function() {
  $("#icons").append('<div class="col-md-3">'
    + '<div class="card">'
    // + '<div style="background-image: url(meetups/'+this.id+'.png); background-position: bottom; background-repeat: repeat;"></div>'
      + '<img class="card-img-top" style="width: auto; height: auto;max-width: 100%;max-height: 120px" src="meetups/' + this.id + '.png" alt="' + this.name + ' logo" />'
      + '<div class="card-body">'
        + '<h5 class="card-title">' + this.name + '</h5>'
        + '<a href="https://www.meetup.com/' + this.id + '/" class="btn btn-primary">Plus d\'information</a>'
      + '</div>'
    + '</div>'
  + '</div>');
    // + "<span class='meetup-title'><a class='border-0' href='https://www.meetup.com/"+this.id+"/'>"+this.name+"</a></span></div>" );
  $.getScript("https://api.meetup.com/"+this.id+"/events?fields=featured_photo&callback=addEvents");
});

addEvents = function(json) {
	$.each(json.data, function() {
    var pos = 0;
    while (pos < events.length) {
      if (events[pos].time >= this.time) {
        break;
      }
      pos++;
    }
    events.splice(pos,0, this);

    $('#events li:eq('+pos+')').after(
          "<li class='col-md-4'>"
    		+ "<div class='card mb-4 box-shadow'>"
        + "<img class='card-img-top' >"
    		+ "<img class='card-img-top' style='height: 180px; width: 100%; display: block;' src='meetups/"+ this.group.urlname + ".png'>"
    		+ "<div class='card-body'>"
            	+ "<h5 class='card-title'>"+this.name+"</h5>"
            	+ "<h6 class='card-subtitle'><i class='far fa-calendar'></i> "+this.local_date+"</h6>"
    		+ "<div class='card-text'>"
            	+ this.description
            	+ "</div>"
            	+ "<div class='d-flex justify-content-between align-items-center'>"
            	+ "<a href='"+this.link+"'>En savoir plus ...</a>"
        + "</div></div></div>"
        + "</li>");
  });
}
