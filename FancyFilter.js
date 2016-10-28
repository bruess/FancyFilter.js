var FancyFilter = function(selector, done) {
    var self = this;
    var targetSelector = selector;
    var doneCallback = done;
    var inputElement;

    self.delimiter = ',';
    self.columnDelimiter = ':';
    self.ignoredClass = 'ffIgnore';
    self.matchedClass = 'ffMatched';
    self.notMatchedClass = 'ffNotMatched';
    self.matched;
    self.notMatched;

    self.filter = function(query) {
        if (query instanceof Event) { query = inputElement.value; }
        query = normalize(query);

        var targetElements = document.querySelectorAll(targetSelector);
        targetElements.forEach(function(targetElement) {
            if (testMatch(targetElement, query)) {
                matched(targetElement);
            } else {
                notMatched(targetElement);
            }
        });

        if (typeof doneCallback == 'function') {
            self.matched = document.querySelectorAll(targetSelector+'.'+self.matchedClass)
            self.notMatched = document.querySelectorAll(targetSelector+'.'+self.notMatchedClass)
            doneCallback.call(self);
        }
    }

    self.addInputListener = function(selector) {
        inputElement = document.querySelector(selector);
        inputElement.addEventListener('input', self.filter);
    }

    var testMatch = function(element, query) {
        if (element.classList.contains(self.ignoredClass)) { return true; }

        var headers = getTableHeaders(element);

        var queryParts = query.split(self.delimiter);
        var result = queryParts.every(function(queryPart) {
            var queryPart = normalize(queryPart);
            var targetText = normalize(element.innerHTML);

            // Check to see if column search is being attempted
            if (queryPart.indexOf(':') !== -1) {
                var queryPartParts = queryPart.split(self.columnDelimiter);
                var columnIndex = headers.indexOf(queryPartParts[0]);

                // Override the queryPart and targetText for this iteration if found matching column
                if (columnIndex !== -1) {
                    queryPart = queryPartParts[1];
                    targetText = normalize(element.querySelectorAll('td')[columnIndex].innerHTML);
                }
            }

            if (queryPart === '') {
                return true;
            }

            return (targetText.search(queryPart) !== -1);

        });

        return result;
    }

    var getTableHeaders = function(element) {
        var headerElement = element.parentElement.parentElement.querySelectorAll('thead th');

        var headers = [];
        headerElement.forEach(function(header) {
            var headerText = normalize(header.innerHTML);
            headers.push(headerText);
        });

        return headers;
    }

    var matched = function(element) {
        element.classList.add(self.matchedClass);
        element.classList.remove(self.notMatchedClass);
    }

    var notMatched = function(element) {
        element.classList.add(self.notMatchedClass);
        element.classList.remove(self.matchedClass);
    }

    var normalize = function(text) {
        return text.
            replace(/(<([^>]+)>)/ig,'').
            replace(/\n/,'').
            replace(/ +/g, ' ').
            toLowerCase().
            trim();
    }
}
