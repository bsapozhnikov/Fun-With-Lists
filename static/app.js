var App = new Marionette.Application();

App.addRegions({
    list: "#list" 
});

App.on('start',function(){
    //var entry = new Entry({name:'Clothes'});
    var c = new List();
    var listView = new App.ListView({collection:c});
    App.list.show(listView);
});

var Entry = Backbone.Model.extend({
    urlRoot: '/entries'
});
var List = Backbone.Collection.extend({
    model: Entry,
    url: '/entries',
    initialize: function(){
	this.fetch(null,function(d){
	    this.render();
	});
    }
});

App.EntryView = Marionette.ItemView.extend({
    template: "#entry-template",
    tagName: "ul",
    events: {
	'click #entry-name': function(e){
	    var name = $(e.target).replaceWith('<input type="text" id="edit-entry-name" />');
	    $('#edit-entry-name').val(name.text()).focus();
	},
	'blur #edit-entry-name' : function(){
	    this.model.set('name',$('#edit-entry-name').val()).save();
	    $('#edit-entry-name').replaceWith('<div id="entry-name">'+this.model.get('name')+'</div>');
	}
    }
});

App.ListView = Marionette.CompositeView.extend({
    template : "#list-template",
    modelView: App.EntryView,
    childView: App.EntryView,
    childViewContainer: "ul",
    modelEvents: {
	'change' : function(){this.render();}
    },
    events: {
	'click #add-new-entry': function() {
	    var n = $('#new-entry-name').val();
	    if (n.length > 0){
		var e = new Entry({name: n});
		this.collection.add(e);
		e.save();
		$('#new-entry-name').val('');
	    }
	}
    }
});

App.start();
