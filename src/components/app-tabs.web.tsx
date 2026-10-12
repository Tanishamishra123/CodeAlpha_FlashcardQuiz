
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/build/ui';
import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const { ThemedText } = require('./themed-text');
const { ThemedView } = require('./themed-view');

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <View style={styles.app}>
      <Tabs>
        <TabSlot style={styles.tabSlot} />

        <TabList asChild>
          <CustomTabList>
            <TabTrigger name="home" href="/" asChild>
              <TabButton>🏠 Home</TabButton>
            </TabTrigger>

            <TabTrigger name="explore" href="/explore" asChild>
              <TabButton>📚 Explore</TabButton>
            </TabTrigger>
          </CustomTabList>
        </TabList>
      </Tabs>
    </View>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }: { pressed: boolean }) => [
        styles.tabButton,
        pressed && styles.pressed,
      ]}
    >
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={[
          styles.tabButtonView,
          isFocused && styles.activeTab,
        ]}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
          style={isFocused ? styles.activeText : undefined}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="backgroundElement"
        style={styles.innerContainer}
      >
        <Text style={[styles.brandText, { color: colors.text }]}>
          ✦ FlashLearn
        </Text>

        <View style={styles.links}>
          {props.children}
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  tabSlot: {
    height: '100%',
  },
  tabListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: '#EAEAF3',
    boxShadow: '0px 4px 18px rgba(35, 30, 80, 0.10)',
  },
  brandText: {
    fontSize: 14,
    fontWeight: '800',
    marginRight: 'auto',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  tabButton: {
    borderRadius: 13,
  },
  tabButtonView: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#EEEAFE',
  },
  activeText: {
    color: '#6957E8',
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});