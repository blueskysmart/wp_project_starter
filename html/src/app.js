import "./scss/styles.scss";
import "bootstrap";

//require all images
var req = require.context("./images", true, /\.(png|svg|jpe?g|gif)$/);
req.keys().forEach(function(key){
    req(key);
});