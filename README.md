# meta-spark-animation-cloner

Allows to clone animations (position, rotation, scale) from one object to another in Meta Spark.

Basic example:

```javascript
const S = require('Scene');
export const D = require('Diagnostics');

// Import animation cloner module
import { AnimationCloner } from './AnimationCloner.js'


(async function () { 

  // Clone animation (position, rotation and scale) from sphere0 to sphere0_clone
  AnimationCloner.create('sphere0', 'sphere0_clone')
  
})(); 
```


You can control which properties to clone:

```javascript
  AnimationCloner.create('sphere0', 'sphere0_clone', {
     object: true, // when false, position, rotation and scale values are ignored and no animations cloned.
     position: true,
     rotation: true,
     scale: true,
     world: true, // when true, clones world transforms instead of local transforms
  })
```


Instead of scene object names, you can pass just objects. Useful if you already retrieved objects in loop or other function:

```javascript
  const sphere0 = await S.root.findFirst('sphere0')
  const sphere0_clone = await S.root.findFirst('sphere0_clone')
  
  AnimationCloner.create(sphere0, sphere0_clone)
```

## Cloning a whole structure

You can clone not only object animations, but also its structure: animations of objects inside it.
Object animations will be also cloned, until you turn them off using options mentioned above.

```javascript
  // Mirror animation from struct to struct_clone, including elements inside which have "plane*" names

  AnimationCloner.create('struct', 'struct_clone', {
    elements: '**/plane*',
  })
```

Options available for elements:

```javascript
  // Mirror animation from struct to struct_clone, including elements inside which have "plane*" names

  AnimationCloner.create('struct', 'struct_clone', {
    elements: '**/plane*',
    elementsPosition: true,
    elementsRotation: true,
    elementsScale: true,
    elementsWorld: false, // when true, clones world transforms instead of local transforms
  })
```
