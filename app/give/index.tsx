import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { Stack } from "expo-router";
import { DollarSign, CreditCard, Landmark, Smartphone, ArrowRight, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme, colors } from "@/constants/colors";
import { APP_NAME } from "@/constants/config";

export default function GiveScreen() {
  const [amount, setAmount] = useState("");
  const [selectedFund, setSelectedFund] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const predefinedAmounts = ["10", "25", "50", "100", "250"];

  const funds = [
    { id: "general", name: "General Fund", description: "Support the overall ministry and operations of the church" },
    { id: "missions", name: "Missions Fund", description: "Support our global and local mission partners" },
    { id: "building", name: "Building Fund", description: "Help maintain and improve our church facilities" },
    { id: "benevolence", name: "Benevolence Fund", description: "Provide assistance to those in need in our community" },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Give" }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.primary, '#0055FF']}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>Support {APP_NAME}</Text>
          <Text style={styles.bannerText}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </Text>
        </LinearGradient>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          
          <View style={styles.amountContainer}>
            <View style={styles.currencyContainer}>
              <DollarSign size={20} color={theme.secondaryText} />
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor={theme.secondaryText}
              />
            </View>
            
            <View style={styles.predefinedAmounts}>
              {predefinedAmounts.map((preAmount) => (
                <TouchableOpacity 
                  key={preAmount}
                  style={[
                    styles.predefinedButton,
                    amount === preAmount && styles.selectedPredefinedButton
                  ]}
                  onPress={() => setAmount(preAmount)}
                >
                  <Text 
                    style={[
                      styles.predefinedButtonText,
                      amount === preAmount && styles.selectedPredefinedText
                    ]}
                  >
                    ${preAmount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select Fund</Text>
          
          <View style={styles.fundsContainer}>
            {funds.map((fund) => (
              <TouchableOpacity 
                key={fund.id}
                style={[
                  styles.fundItem,
                  selectedFund === fund.id && styles.selectedFundItem
                ]}
                onPress={() => setSelectedFund(fund.id)}
              >
                <View style={styles.fundHeader}>
                  <Text 
                    style={[
                      styles.fundName,
                      selectedFund === fund.id && styles.selectedFundName
                    ]}
                  >
                    {fund.name}
                  </Text>
                  <View 
                    style={[
                      styles.radioButton,
                      selectedFund === fund.id && styles.selectedRadioButton
                    ]}
                  >
                    {selectedFund === fund.id && <View style={styles.radioButtonInner} />}
                  </View>
                </View>
                <Text 
                  style={[
                    styles.fundDescription,
                    selectedFund === fund.id && styles.selectedFundDescription
                  ]}
                >
                  {fund.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentMethodsContainer}>
            <TouchableOpacity 
              style={[
                styles.paymentMethod,
                paymentMethod === "card" && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <CreditCard 
                size={24} 
                color={paymentMethod === "card" ? theme.primaryText : theme.secondaryText} 
              />
              <Text 
                style={[
                  styles.paymentMethodText,
                  paymentMethod === "card" && styles.selectedPaymentMethodText
                ]}
              >
                Credit/Debit Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentMethod,
                paymentMethod === "bank" && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod("bank")}
            >
              <Landmark 
                size={24} 
                color={paymentMethod === "bank" ? theme.primaryText : theme.secondaryText} 
              />
              <Text 
                style={[
                  styles.paymentMethodText,
                  paymentMethod === "bank" && styles.selectedPaymentMethodText
                ]}
              >
                Bank Account
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentMethod,
                paymentMethod === "mobile" && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod("mobile")}
            >
              <Smartphone 
                size={24} 
                color={paymentMethod === "mobile" ? theme.primaryText : theme.secondaryText} 
              />
              <Text 
                style={[
                  styles.paymentMethodText,
                  paymentMethod === "mobile" && styles.selectedPaymentMethodText
                ]}
              >
                Mobile Payment
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[
              styles.continueButton,
              (!amount || parseFloat(amount) <= 0) && styles.disabledButton
            ]}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <Text style={styles.continueButtonText}>Continue to Payment</Text>
            <ArrowRight size={20} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.secureNotice}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }} 
              style={styles.secureIcon} 
            />
            <Text style={styles.secureText}>
              Your transaction is secure and encrypted
            </Text>
          </View>

          <View style={styles.recurringSection}>
            <Text style={styles.recurringTitle}>Set Up Recurring Giving</Text>
            <Text style={styles.recurringText}>
              Support the ministry consistently by setting up a recurring donation on a weekly, bi-weekly, or monthly basis.
            </Text>
            <TouchableOpacity style={styles.recurringButton}>
              <Heart size={20} color={theme.primaryText} />
              <Text style={styles.recurringButtonText}>Set Up Recurring Gift</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  banner: {
    padding: 20,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    opacity: 0.9,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginTop: 24,
    marginBottom: 16,
  },
  amountContainer: {
    marginBottom: 16,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: theme.text,
    paddingVertical: 12,
    marginLeft: 8,
  },
  predefinedAmounts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  predefinedButton: {
    width: "30%",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPredefinedButton: {
    backgroundColor: theme.primaryText,
  },
  predefinedButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.secondaryText,
  },
  selectedPredefinedText: {
    color: colors.white,
  },
  fundsContainer: {
    marginBottom: 16,
  },
  fundItem: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedFundItem: {
    backgroundColor: colors.primary,
  },
  fundHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fundName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.text,
  },
  selectedFundName: {
    color: colors.white,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.secondaryText,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadioButton: {
    borderColor: colors.white,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  fundDescription: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  selectedFundDescription: {
    color: colors.white,
    opacity: 0.9,
  },
  paymentMethodsContainer: {
    marginBottom: 24,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: theme.primaryText,
    borderWidth: 1,
  },
  paymentMethodText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 12,
  },
  selectedPaymentMethodText: {
    fontWeight: "500",
  },
  continueButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.primaryText,
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: colors.mediumGray,
    opacity: 0.7,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginRight: 8,
  },
  secureNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  secureIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  secureText: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  recurringSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    alignItems: "center",
  },
  recurringTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.text,
    marginBottom: 8,
  },
  recurringText: {
    fontSize: 14,
    color: theme.secondaryText,
    textAlign: "center",
    marginBottom: 16,
  },
  recurringButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.primaryText,
  },
  recurringButtonText: {
    fontSize: 16,
    color: theme.primaryText,
    fontWeight: "500",
    marginLeft: 8,
  },
});