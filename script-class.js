class ScrollPlugin {
  constructor() {
    const scrollContainers = document.querySelectorAll( '.scroll-container' )

    this.Events( scrollContainers )
  }

  OnScrollStop( Container, callback ) {
    let isScrolling
    
    Container.addEventListener('scroll', function() {
      clearTimeout( isScrolling )

      isScrolling = setTimeout(() => {
        callback()
      }, 150)
    })
  }
  
  Events( Containers ) {
    Containers.forEach(Container => {
      const onScrollStop = callback => {
        let isScrolling
    
        Container.addEventListener('scroll', function() {
          clearTimeout( isScrolling )
    
          isScrolling = setTimeout(() => {
            callback()
          }, 150)
        })
      }
    
      onScrollStop(() => {
        /*const items = Container.querySelectorAll( '.scroll-item' )
    
        const containerPosition = Container.offsetTop
    
        items.forEach(Item => {
          const itemPosition = Item.offsetTop - containerPosition
    
          console.log( itemPosition )
    
          Item.addEventListener('click', function() {
            console.log(Item.offsetTop)
          })
        })*/
    
        const containerPosition = Container.offsetTop
    
        const items = Container.querySelectorAll( '.scroll-item' )
    
        const item1 = items[0].getBoundingClientRect().top
    
        const item1Position = item1 - containerPosition
    
        console.log( item1Position )
      })
    });
  }
}