export class dataManager {
    private target;
    private KEGGAPI;
    private pathway;
    private proxy;
    private expression;
    private cy;
    private conditions;
    private interval;
  
    constructor(parent: Element) {
        this.target = null
        this.KEGGAPI = 'http://rest.kegg.jp/get/';
        this.pathway = 'hsa04910';
        this.proxy = null;
        this.expression = null;
        this.cy =null;
        this.conditions = null;
        this.interval = null;
    }


     /**
   * Initialize the view and return a promise
   * that is resolved as soon the view is compconstely initialized.
   * @returns {Promise<App>}
   */
    init() {
        return this.build();
    }

/**
     * Load and initialize all necessary views
     * @returns {Promise<App>}
     */
    private async find(arr, cmp) {
        var y = arr[0] || null;
        for(var i = 1; i < arr.length; i++){
            y = cmp(y, arr[i]);
        }
        return y;
    }

    /**
     * Load and initialize all necessary views
     * @returns {Promise<App>}
     */
    private async build() {
        console.log('this is the build!')
          }
    }
  
  /**
   * Factory method to create a new app instance
   * @param parent
   * @returns {App}
   */
  export function create(parent:Element) {
    return new dataManager(parent);
  }