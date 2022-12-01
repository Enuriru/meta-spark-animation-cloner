

const S = require('Scene');
export const D = require('Diagnostics');

// Import animation cloner module
import { AnimationCloner } from './AnimationCloner.js'


(async function () { 

  // Mirror animation from sphere0 to sphere1_clone

  AnimationCloner.create('sphere0', 'sphere1_clone', {
    world: false // transforms are in local space
  })

  

})(); 
