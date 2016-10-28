# FancyFilter.js

A simple to use JavaScript library that allows you to filter elements on a web page.

## Instantiation Arguments
`FancyFilter(selector, done)`

| Name | Type | Description |
| :-- | :-: | :-- |   
| selector | string | This is used in the `querySelectorAll()` method to get the elements to filter.  |
| done | callback | This gets called every time the `filter()` method is done running. |

## Methods
| Name | Description |
| :-- | :-- |  
| `filter(query)` | This uses `query` to preform the filter logic. |
| `addInputListener(selector)` | This sets up an `input` event listener for the element that matches the selector that call the filter method with the value of the matched element. |

## Properties
| Name | Type | Default | Description |
| :-- | :-: | :-: | :-- |  
| `delimiter` | string | `','` | This is the delimiter used to break the query into an array. |
| `columnDelimiter` | string | `':'` | This is the delimiter used to break each item in the query array to match to a column in a table. |
| `ignoredClass` | string | `'ffIgnore'` | Any elements with this class will not be filtered. |
| `matchedClass` | string | `'ffMatched'` | The class that gets applied to any elements that match the query. |
| `notMatchedClass` | string | `'ffNotMatched'` | The class that gets applied to any elements that do not match the query. |
| `matched` | object | `undefined` | The result of a `querySelectorAll` for all the matched elements. |
| `notMatched` | object | `undefined` | The result of a `querySelectorAll` for all the not matched elements. |

## Usage Examples

```javascript
var ff = new FancyFilter('table tbody tr');
ff.addInputListener('#myFilterTextInput');
```

```javascript
var ff = new FancyFilter('table tbody tr', function() {
    document.querySelector('#resultCount').innerHTML = this.matched.length;
};
ff.addInputListener('#myFilterTextInput');
```
