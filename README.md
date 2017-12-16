# browser-back-button

## Build Setup

``` bash
# install
npm install browser-back-button
```

``` html

<button onclick="show()">show</button>
<div id="popup" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#fff;display:none;">
    <h1>popup div</h1>
    <p>use back button to hide</p>
</div>

<script>
    import backButton from 'browser-back-button';

    function show(){
        let popup = document.querySelector('#popup');

        popup.style.display = 'block';

        backButton.on(()=>{
            popup.style.display = 'none';
        });
    }
</script>

```
