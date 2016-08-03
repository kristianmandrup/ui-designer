define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Hello World!';
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('report',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', 'sortable'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, sortable) {
    "use strict";
    var Report = (function () {
        function Report(evtAgg) {
            var _this = this;
            this.widgets = [];
            this.ea = evtAgg;
            this.ea.subscribe('clearReport', function () {
                _this.widgets = [];
            });
        }
        Report.prototype.removeWidget = function (widget) {
            var idx = this.widgets.map(function (obj, index) {
                if (obj.id === widget.id)
                    return index;
            }).reduce(function (prev, current) {
                return current || prev;
            });
            this.widgets.splice(idx, 1);
        };
        Report.prototype.attached = function () {
            var _this = this;
            new sortable(this.reportSheet, {
                group: 'report',
                onAdd: function (evt) {
                    var type = evt.item.title, model = Math.random(), txt = '', newPos = evt.newIndex;
                    evt.item.parentElement.removeChild(evt.item);
                    if (type === 'textblock') {
                        txt = prompt('Enter textblock content');
                        if (model === undefined || model === null)
                            return;
                    }
                    _this.widgets.splice(newPos, 0, {
                        id: Math.random(),
                        type: type,
                        txt: txt,
                        model: model
                    });
                }
            });
        };
        Report = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [Object])
        ], Report);
        return Report;
    }());
    exports.Report = Report;
});

define('widgets/textblock',["require", "exports"], function (require, exports) {
    "use strict";
    var Textblock = (function () {
        function Textblock() {
            this.type = 'textblock';
            this.name = 'Textblock';
            this.icon = 'fa-font';
            this.text = 'Lorem ipsum';
        }
        Textblock.prototype.activate = function (model) {
            this.text = model;
        };
        return Textblock;
    }());
    exports.Textblock = Textblock;
});

define('widgets/header',["require", "exports"], function (require, exports) {
    "use strict";
    var Header = (function () {
        function Header() {
            this.type = 'header';
            this.name = 'Report header';
            this.icon = 'fa-header';
        }
        return Header;
    }());
    exports.Header = Header;
});

define('widgets/articles',["require", "exports"], function (require, exports) {
    "use strict";
    var Articles = (function () {
        function Articles() {
            this.type = 'articles';
            this.name = 'Articles';
            this.icon = 'fa-list';
            this.articles = [
                {
                    name: 'Coke',
                    price: 'USD 1.20'
                },
                {
                    name: 'Pizza',
                    price: 'USD 4.73'
                },
                {
                    name: 'Stuff',
                    price: 'USD 0.20'
                }
            ];
        }
        return Articles;
    }());
    exports.Articles = Articles;
});

define('widgets/logo',["require", "exports"], function (require, exports) {
    "use strict";
    var Logo = (function () {
        function Logo() {
            this.type = 'logo';
            this.name = 'Logo';
            this.icon = 'fa-building-o';
        }
        return Logo;
    }());
    exports.Logo = Logo;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('toolbox',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', 'sortable', './widgets/textblock', './widgets/header', './widgets/articles', './widgets/logo'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, sortable, textblock_1, header_1, articles_1, logo_1) {
    "use strict";
    var Toolbox = (function () {
        function Toolbox(evtAgg, textBlock, header, articles, logo) {
            this.widgets = [
                textBlock,
                header,
                articles,
                logo
            ];
            this.ea = evtAgg;
        }
        Toolbox.prototype.attached = function () {
            new sortable(this.toolboxList, {
                sort: false,
                group: {
                    name: "report",
                    pull: 'clone',
                    put: false
                }
            });
        };
        Toolbox.prototype.printReport = function () {
            window.print();
        };
        Toolbox.prototype.clearReport = function () {
            this.ea.publish('clearReport');
        };
        Toolbox = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, textblock_1.Textblock, header_1.Header, articles_1.Articles, logo_1.Logo), 
            __metadata('design:paramtypes', [Object, Object, Object, Object, Object])
        ], Toolbox);
        return Toolbox;
    }());
    exports.Toolbox = Toolbox;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n</template>\n"; });
define('text!report.html', ['module'], function(module) { module.exports = "<template>\n  <ul class=\"list-unstyled report\" ref=\"reportSheet\">\n    <li repeat.for=\"widget of widgets\" class=\"au-animate\">\n      <compose\n        model.bind=\"widget.model\"\n        view-model=\"widgets/${widget.type}\" class=\"col-md-11\"></compose>\n      <i class=\"remove-widget fa fa-trash-o col-md-1 non-printable\" click.trigger=\"$parent.removeWidget(widget)\"></i>\n    </li>\n  </ul>\n</template>\n"; });
define('text!toolbox.html', ['module'], function(module) { module.exports = "<template>\n  <h3>Toolbox</h3>\n  <ul class=\"list-unstyled toolbox au-stagger\" ref=\"toolboxList\">\n    <li repeat.for=\"widget of widgets\" class=\"au-animate\" title=\"${widget.type}\"><i class=\"fa ${widget.icon}\"/> ${widget.name}</li>\n  </ul>\n  <button click.delegate=\"printReport()\" type=\"button\" class=\"btn btn-primary fa fa-print\"> Print</button>\n  <button click.delegate=\"clearReport()\" type=\"button\" class=\"btn btn-warning fa fa-remove\"> Clear Report</button>\n</template>\n"; });
define('text!widgets/articles.html', ['module'], function(module) { module.exports = "<template>\n  <table class=\"table col-md-12\">\n    <thead>\n      <th>#</th>\n      <th>Article</th>\n      <th>Price</th>\n    </thead>\n    <tbody>\n      <tr repeat.for=\"article of articles\">\n        <td>${$index}</td>\n        <td>${article.name}</td>\n        <td>${article.price}</td>\n      </tr>\n    </tbody>\n  </table>\n</template>\n"; });
define('text!widgets/header.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-12\">\n    <h2>Abstract-IT &trade;</h2>\n    <p>Delivering concrete solutions</p>\n\n    <div class=\"pull-right\">\n      Funnyroad 123<br />\n      1010 SOME-STATE<br />\n      USA<br />\n    </div>\n  </div>\n</template>\n"; });
define('text!widgets/logo.html', ['module'], function(module) { module.exports = "<template>\n    <img src=\"images/main-logo.png\" />\n</template>\n"; });
define('text!widgets/textblock.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-12\">\n    ${text}\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map