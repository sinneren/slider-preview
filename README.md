## Welcome to Slider-Preview

Use `$(selector).sp();` for initialize plugin.
For example, initializaion with parameters:

```javascript
$('#plug').sp({
    maximum_items: 6,
    activeChanged: function () {
        console.log('Active slide change event');
    }
});
```
## Example

Here an example page: [Demo](https://sinneren.github.io/slider-preview/example/)

## Parameters

### Maximum items for load
Use `maximum_items: number` to display count of your slides. By default number is 4.
### Change active class
Use `active_class: ' your_class '` to change active class of slides. By default class name is "active".
### Image size styling
Use `image_size_style` to set sizing. By default is 'cover'. By now, only two types: cover and contain is available.
### Event of changed active slide
Use `activeChanged: your_callbak_function()` to set your callback when active slide is changed by logic with class name, but not positioned yet.

