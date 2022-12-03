

const S = require('Scene');
export const D = require('Diagnostics');

// Import animation cloner module
import { AnimationCloner } from './AnimationCloner.js'


(async function () { 

  // Mirror animation from sphere0 to sphere0_clone

  AnimationCloner.create('sphere', 'sphere_clone')


  // Mirror animation from struct to struct_clone, including elements inside which have "plane*" names

  AnimationCloner.create('struct', 'struct_clone', {
    elements: '**/plane*',
  })
  

})(); 
