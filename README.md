# React Navigation bug where isFocused is never true on a focused screen

Issue in React Navigation Github repository: https://github.com/react-navigation/react-navigation/issues/7843.

## How to reproduce the issue

In `App.js`, you'll see a drawerNavigator. In this drawerNavigator, the item in the middle (`Authorized`) is shown conditionally, based upon an asynchronous API-call (mocked in this repos by a `setTimeout`).

If you pull out the drawer navigator (by swiping the home screen from left to right) and navigate to the last item in the drawerNavigator (`Help`) and you click through to the secondary screen, you'll see that the Back button of the Stack navigator does not work.

After some digging into the `react-navigation` code, this is caused by `isFocused()` returning `false` for all Help screens. This is caused by the fact that an index comparison takes place inside the `isFocused` function. Since the index of the Help screen is `1` on the initial render and becomes `2` when `Authorized` is added, the `isFocused` function has an index mismatch, thus making the back button not work. Please be aware that the swipe gesture **does** work.

## Workaround to make it work

In order to make this work, we need to make sure the `NavigationContainer` / `Drawer.Navigator` is fully rerendered after a conditional item has been added.

We can make sure this works by adjusting our drawer navigator code like this:

```
function App() {
  const [navReady, setNavReady] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthorized(true)
      setNavReady(true)
    }, 1000);

    return () => {
      setNavReady(false)
    }
  }, [setIsAuthorized, setNavReady]);

  if (!navReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        {isAuthorized && (
          <Drawer.Screen name="Authorized" component={AuthorizedScreen} />
        )}
        <Drawer.Screen name="Help" component={HelpNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```
