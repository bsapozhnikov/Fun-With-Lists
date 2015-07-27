var App = new Marionette.Application();

App.addRegions({
    list: "#list" 
});

App.on('start',function(){
    var entry = new Entry({name:'Clothes'});
    var c = new List([entry]);
    var listView = new App.ListView({collection:c});
    App.list.show(listView);
});

var Entry = Backbone.Model.extend();
var List = Backbone.Collection.extend({
    model: Entry
});

App.EntryView = Marionette.ItemView.extend({
    template: "#entry-template",
    tagName: "li"
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
		this.collection.add(new Entry({name: n}));
		$('#new-entry-name').val('');
	    }
	}
    }
});

App.start();
