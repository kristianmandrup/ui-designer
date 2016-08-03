import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import sortable = require('sortable');

@inject(EventAggregator)
export class Canvas {
  ea: EventAggregator;
  reportSheet: any;

  constructor(evtAgg) {
    this.ea = evtAgg;
    this.ea.subscribe('clearReport', () => {
      this.widgets = [];
    });
  }

  widgets = [];

  removeWidget(widget) {
  }

  attached() {
    new sortable(this.reportSheet, {
      group: 'report',
      onAdd: (evt) => {
        let type = evt.item.title,
            model = Math.random(),
            txt = '',
            newPos = evt.newIndex;

        evt.item.parentElement.removeChild(evt.item);

        if(type === 'textblock') {
          txt = prompt('Enter textblock content');
          if(model === undefined || model === null)
            return;
        }

        this.widgets.splice(newPos, 0, {
          id: Math.random(),
          type: type,
          txt: txt,
          model: model
        });
      }
    });
  }
}
