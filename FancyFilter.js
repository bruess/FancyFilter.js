var FancyFilter = function(selector, done) {
    var self = this;
    var targetSelector = selector;
    var doneCallback = done;
    var inputElement;

    self.delimiter = ',';
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
        var result = false;
        if (element.classList.contains(self.ignoredClass)) { return true; }

        var queryParts = query.split(self.delimiter);
        queryParts.forEach(function(queryPart) {
            queryPart = normalize(queryPart);
            targetText = normalize(element.innerHTML);

            if (targetText.indexOf(queryPart) !== -1) {
                result = true;
            }

        });

        return result;
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
