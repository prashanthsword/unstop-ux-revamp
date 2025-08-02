import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Card,
  Text,
  List,
  Switch,
  Button,
  Divider,
  Avatar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme, styles } from '../theme/theme';
import { farmerProfile } from '../data/farmData';

const SettingsScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage.name);
    Alert.alert(
      'Language Changed',
      `Language has been changed to ${selectedLanguage.name}. The app will restart to apply changes.`,
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => Alert.alert('Logged Out', 'You have been logged out successfully')
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted')
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <Card style={[styles.card, { marginTop: theme.spacing.md }]}>
        <Card.Content>
          <View style={localStyles.profileSection}>
            <Avatar.Text 
              size={60} 
              label={farmerProfile.name.split(' ').map(n => n[0]).join('')}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={localStyles.profileInfo}>
              <Text variant="titleMedium">{farmerProfile.name}</Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                {farmerProfile.phone}
              </Text>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
                {farmerProfile.village}, {farmerProfile.district}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            onPress={() => Alert.alert('Edit Profile', 'Profile editing feature coming soon!')}
            style={{ marginTop: theme.spacing.md }}
          >
            Edit Profile
          </Button>
        </Card.Content>
      </Card>

      {/* Language Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Language / भाषा / భాష
          </Text>
          
          {languages.map((lang) => (
            <List.Item
              key={lang.code}
              title={lang.name}
              description={lang.nativeName}
              left={(props) => (
                <Ionicons 
                  name={language === lang.name ? 'radio-button-on' : 'radio-button-off'} 
                  size={24} 
                  color={language === lang.name ? theme.colors.primary : theme.colors.outline}
                  style={{ marginTop: 8 }}
                />
              )}
              onPress={() => handleLanguageChange(lang)}
              style={localStyles.listItem}
            />
          ))}
        </Card.Content>
      </Card>

      {/* App Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            App Settings
          </Text>
          
          <List.Item
            title="Push Notifications"
            description="Receive alerts for bookings, payments, and updates"
            left={(props) => <Ionicons name="notifications" size={24} color={theme.colors.secondary} style={{ marginTop: 8 }} />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color={theme.colors.primary}
              />
            )}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Location Services"
            description="Allow app to access your location for better services"
            left={(props) => <Ionicons name="location" size={24} color={theme.colors.success} style={{ marginTop: 8 }} />}
            right={() => (
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                color={theme.colors.primary}
              />
            )}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Biometric Login"
            description="Use fingerprint or face recognition to login"
            left={(props) => <Ionicons name="finger-print" size={24} color={theme.colors.warning} style={{ marginTop: 8 }} />}
            right={() => (
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                color={theme.colors.primary}
              />
            )}
            style={localStyles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Support & Help */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Support & Help
          </Text>
          
          <List.Item
            title="Help Center"
            description="FAQs and user guides"
            left={(props) => <Ionicons name="help-circle" size={24} color={theme.colors.info} style={{ marginTop: 8 }} />}
            right={(props) => <Ionicons name="chevron-forward" size={20} color={theme.colors.outline} style={{ marginTop: 12 }} />}
            onPress={() => Alert.alert('Help Center', 'Help center feature coming soon!')}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Contact Support"
            description="Get help from our support team"
            left={(props) => <Ionicons name="headset" size={24} color={theme.colors.secondary} style={{ marginTop: 8 }} />}
            right={(props) => <Ionicons name="chevron-forward" size={20} color={theme.colors.outline} style={{ marginTop: 12 }} />}
            onPress={() => Alert.alert('Contact Support', 'Call: 1800-123-4567\nEmail: support@agrosoft.com')}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Tutorial Videos"
            description="Learn how to use AgroSoft features"
            left={(props) => <Ionicons name="play-circle" size={24} color={theme.colors.accent} style={{ marginTop: 8 }} />}
            right={(props) => <Ionicons name="chevron-forward" size={20} color={theme.colors.outline} style={{ marginTop: 12 }} />}
            onPress={() => Alert.alert('Tutorial Videos', 'Video tutorials feature coming soon!')}
            style={localStyles.listItem}
          />
        </Card.Content>
      </Card>

      {/* About */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            About
          </Text>
          
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props) => <Ionicons name="information-circle" size={24} color={theme.colors.primary} style={{ marginTop: 8 }} />}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Privacy Policy"
            description="Read our privacy policy"
            left={(props) => <Ionicons name="shield-checkmark" size={24} color={theme.colors.success} style={{ marginTop: 8 }} />}
            right={(props) => <Ionicons name="chevron-forward" size={20} color={theme.colors.outline} style={{ marginTop: 12 }} />}
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy feature coming soon!')}
            style={localStyles.listItem}
          />
          
          <List.Item
            title="Terms of Service"
            description="Read our terms and conditions"
            left={(props) => <Ionicons name="document-text" size={24} color={theme.colors.outline} style={{ marginTop: 8 }} />}
            right={(props) => <Ionicons name="chevron-forward" size={20} color={theme.colors.outline} style={{ marginTop: 12 }} />}
            onPress={() => Alert.alert('Terms of Service', 'Terms of service feature coming soon!')}
            style={localStyles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Account Actions */}
      <Card style={[styles.card, { marginBottom: theme.spacing.xl }]}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md }}>
            Account
          </Text>
          
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={[localStyles.accountButton, { borderColor: theme.colors.warning }]}
            textColor={theme.colors.warning}
          >
            Logout
          </Button>
          
          <Button
            mode="outlined"
            onPress={handleDeleteAccount}
            style={[localStyles.accountButton, { borderColor: theme.colors.error }]}
            textColor={theme.colors.error}
          >
            Delete Account
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  listItem: {
    paddingHorizontal: 0,
  },
  accountButton: {
    marginBottom: theme.spacing.sm,
  },
});

export default SettingsScreen;