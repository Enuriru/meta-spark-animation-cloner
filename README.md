# meta-spark-animation-cloner

Allows to clone animations (position, rotation, scale) from one objects to another in Spark AR.


```javascript
const S = require('Scene');
export const D = require('Diagnostics');

// Import animation cloner module
import { AnimationCloner } from './AnimationCloner.js'


(async function () { 

  // Clone animation (position, rotation and scale) from sphere0 to sphere1_clone
  AnimationCloner.create('sphere0', 'sphere1_clone')
  
})(); 
```


You can control which properties to clone:

```javascript
  AnimationCloner.create('sphere0', 'sphere1_clone', {
     position: true,
     rotation: true,
     scale: true,
     world: true, // when true, clones world transforms
  })
```


Instead of scene object names, you can pass just objects. Useful if you already retrieved objects in loop or other function:

```javascript
  const sphere0 = await S.root.find('sphere0')
  const sphere1_clone = await S.root.find('sphere1_clone')
  
  AnimationCloner.create(sphere0, sphere1_clone)
```
