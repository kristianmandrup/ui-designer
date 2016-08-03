import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import sortable = require('sortable');

@inject(EventAggregator)
export class ScreenEditor {
  ea: EventAggregator;
  reportSheet: any;

  constructor(evtAgg) {
    this.ea = evtAgg;
    this.ea.subscribe('clearScreen', () => {
      this.widgets = [];
    });
  }

  widgets = [];

  removeWidget(widget) {
    let idx = this.widgets.map( (obj, index) => {
      if( obj.id === widget.id )
        return index;
    }).reduce( (prev, current) => {
      return current || prev;
    });

    this.widgets.splice(idx, 1);
  }

  attached() {
  }
}
