// import { Slot } from "expo-router";

// export default function Layout() {
//   return (
//     <>
//      <Slot />
//     </>
//   );
  
// }

import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialPath="/">
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="historico" options={{ title: "Histórico" }} />
    </Stack>
  );
}
