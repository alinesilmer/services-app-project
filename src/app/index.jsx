import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace('/tabs/splashScreen');
    }
  }, [isReady, router]);

  return <View style={{ flex: 1, backgroundColor: Colors.blueColor }} />;
}