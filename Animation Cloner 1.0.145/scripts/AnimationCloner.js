/*----------------------------------------------------------------------------------------

	Spark AR - Animation Cloner
  1.0.0

	© Denis Rossiev
	http://instagram.com/enuriru/
  https://rossiev.pro
	
	
----------------------------------------------------------------------------------------*/


const S = require('Scene');
const R = require('Reactive');
const D = require('Diagnostics');


export class AnimationCloner {


  constructor() {
    this._inited = false
  }

  /**
   * 
   * @param {String | SceneObject} from 
   * @param {String | SceneObject} to 
   * @param {Object} options 
   */
  
  async init(from, to, options) {

    let defaults = {
      position: true,
      rotation: true,
      scale: true,
      world: true,

      elements: false,
      elementsPosition: true,
      elementsRotation: true,
      elementsScale: true,
      elementsWorld: true,
      
    }

    this.options = this.extend(defaults, options)

    this.from = await this.getObject(from)
    if (!this.from) throw "No From object found (provided: '" + from + "')"

    this.to = await this.getObject(to)
    if (!this.to) throw "No To object found (provided: '" + to + "')"

    let space = this.options.world ? 'worldTransform' : 'transform'

    if (this.options.position) this.to[space].position = this.from[space].position
    if (this.options.rotation) this.to[space].rotation = this.from[space].rotation
    if (this.options.scale) this.to[space].scale = this.from[space].scale

    // 

    if (this.options.elements) {

      this.fromElements = await this.from.findByPath(this.options.elements)
      this.toElements = await this.to.findByPath(this.options.elements)
      space = this.options.elementsWorld ? 'worldTransform' : 'transform'

      for (let index in this.fromElements) {

        let f = this.fromElements[index]
        let t = this.toElements[index]

        if (this.options.elementsPosition) t[space].position = f[space].position
        if (this.options.elementsRotation) t[space].rotation = f[space].rotation
        if (this.options.elementsScale) t[space].scale = f[space].scale

      }

    }

    this._inited = true


  }


    /**
   * Simple two object merge
   * 
   * @param {Object} a 
   * @param {Object} b 
   * @returns {Object}
   */

    extend(a, b) {

    b = b == undefined ? {} : b
    for (let i in b) a[i] = b[i]
    return a

  }


  /**
   * 
   * @param {String | SceneObject} nameOrSceneObject 
   * @returns {Promise}
   */

  getObject(nameOrSceneObject) {
    return typeof nameOrSceneObject == 'string' ? S.root.findFirst(nameOrSceneObject) : Promise.resolve(nameOrSceneObject)
  }



}


/**
 * 
 * @param {String | SceneObject} from 
 * @param {String | SceneObject} to 
 * @param {Object} options 
 * @returns {Promise}
 */

AnimationCloner.create = async function(from, to, options) {
  let ac = new AnimationCloner()
  return ac.init(from, to, options)
}