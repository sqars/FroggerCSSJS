export default class EventEmitter {
    constructor() {
        this.events = {};
    };

    subscribe(eventName, fn) {
      !this.events[eventName] ? this.events[eventName] = [] : false;
      this.events[eventName].push(fn);

      return () =>{
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      }
    };

    emit(eventName, data){
      const event = this.events[eventName];
      if(event){
        event.forEach(fn =>{
          fn.call(null, data);
        });
      }
    };
}