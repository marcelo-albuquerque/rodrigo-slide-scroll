class ScrollPlugin {
  constructor() {
    const scrollContainers = document.querySelectorAll( '.scroll-container' )

    this.Events( scrollContainers )
  }

  Events( Containers ) {
    const AddNavigationItems = ( NavigationContainer, AllScrollItems ) => {
      AllScrollItems.forEach((Item, Key) => {
        const itemPosition = Key + 1

        const navigationItem = document.createElement( 'span' )
        navigationItem.setAttribute( 'class', 'navigation-item')
        navigationItem.setAttribute( 'data-scroll-item', itemPosition)

        if ( Key === 0 ) {
          navigationItem.classList.add( 'active' )
        }

        NavigationContainer.appendChild( navigationItem )
      })
    }

    const AddEventToNavigationItems = ( NavigationContainer, AllScrollItems ) => {
      const GetScrollItem = ( Reference, AllScrollItems ) => {
        let scrollItem

        AllScrollItems.forEach(Item => {
          const reference = Item.getAttribute( 'data-scroll-item' )

          if ( reference === Reference ) {
            scrollItem = Item
          }
        })

        return scrollItem
      }

      const navigationItems = NavigationContainer.querySelectorAll( '.navigation-item' )

      navigationItems.forEach(Item => {
        Item.addEventListener('click', function() {
          const reference = Item.getAttribute( 'data-scroll-item' )

          const scrollItem = GetScrollItem( reference, AllScrollItems )

          scrollItem.scrollIntoView({ behavior: "smooth" })
        })
      })
    }

    const AddAttributeToScrollItems = ( AllScrollItems ) => {
      AllScrollItems.forEach((Item, Key) => {
        const itemPosition = Key + 1
        
        Item.setAttribute( 'data-scroll-item', itemPosition)
      })
    }

    const OnStopScroll = ( Container, NavigationContainer ) => {
      const GetPositionOfAllItems = ( Container ) => {
        const containerPosition = Container.getBoundingClientRect().top
        const itemsPosition = []

        const items = Container.querySelectorAll( '.scroll-item' )

        items.forEach(Item => {
          //console.log( containerPosition )
          //console.log( Item.getBoundingClientRect() )
          const itemPosition = Item.getBoundingClientRect().top - containerPosition

          itemsPosition.push({
            item: Item,
            position: itemPosition
          })
        })

        return itemsPosition
      }

      const ActiveNavigationItem = ( PositionOfAllItems, NavigationContainer ) => {
        const AddNavigationItemActiveStyle = ( ScrollItem ) => {
          const dataOrder = ScrollItem.item.getAttribute( 'data-scroll-item' )

          const GetNavigationItemActive = ( NavigationContainer ) => {
            let activeItem

            const allItems = NavigationContainer.querySelectorAll( '.navigation-item' )

            allItems.forEach(Item => {
              const dataScrollItem = Item.getAttribute( 'data-scroll-item' )

              if ( dataScrollItem === dataOrder ) {
                activeItem = Item
              }
            })

            return activeItem
          }

          const RemoveStyle = ( NavigationContainer ) => {
            const allItems = NavigationContainer.querySelectorAll( '.navigation-item' )

            allItems.forEach(Item => {
              Item.classList.remove( 'active' )
            })
          }

          const AddStyle = ( NavigationItem ) => {
            NavigationItem.classList.add( 'active' )
          }
          
          const navigationItemActive = GetNavigationItemActive( NavigationContainer )

          RemoveStyle( NavigationContainer )
          AddStyle( navigationItemActive )
        }

        PositionOfAllItems.forEach(Item => {
          //console.log( Item.position )
          if ( Item.position === 0 || Item.position === -0.5 ) {
            AddNavigationItemActiveStyle( Item )
          }
        })
      }

      const positionOfAllItems = GetPositionOfAllItems( Container )
      ActiveNavigationItem( positionOfAllItems, NavigationContainer )
    }

    Containers.forEach(Container => {
      const navigationContainer = Container.parentElement.querySelector( '.navigation-container' )
      const allScrollItems = Container.querySelectorAll( '.scroll-item' )

      AddNavigationItems( navigationContainer, allScrollItems )
      AddEventToNavigationItems( navigationContainer, allScrollItems )
      AddAttributeToScrollItems( allScrollItems )

      let isScrolling

      Container.addEventListener('scroll', function() {
        clearTimeout( isScrolling )
  
        isScrolling = setTimeout(() => {
          OnStopScroll( Container, navigationContainer )
        }, 150)
      })
    });
  }
}