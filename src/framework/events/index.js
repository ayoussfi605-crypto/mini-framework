// Mapping betwin props of framework and native DOM events
const EVENT_MAP = {
  onClick: 'click',
  onInput: 'input',
  onChange: 'change',
  onKeyDown: 'keydown',
  onSubmit: 'submit',
  onDblClick: 'dblclick'
};

export function addEvent(element, propName, handler){
    const nativeEvent =  EVENT_MAP[propName]
    if(nativeEvent && typeof handler === 'function'){
        element.addEventListener(nativeEvent, (e) =>{
            handler(e);
        });
    }
}

//Helper of Keyboard Events 
export function handleKey(e, onEnter, onEscape) {
   if(e.key === 'Enter' && onEnter){
    onEnter(e);
   } else if(e.key === 'Escape' && onEscape){
    onEscape(e);
   }
}