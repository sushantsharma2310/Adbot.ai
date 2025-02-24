// Update the routes section to include the payment route:

<Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/onboarding" element={<OnboardingPage />} />
  <Route path="/get-started" element={<GetStartedPage />} />
  <Route path="/create" element={<AdCreator />} />
  <Route path="/templates" element={<TemplateSelection />} />
  <Route path="/editor/:templateId" element={<AdEditor />} />
  <Route path="/subscription" element={<SubscriptionPage />} />
  <Route path="/payment" element={<PaymentPage />} /> {/* Update this line */}
  <Route path="/subscription/confirmation" element={<SubscriptionConfirmation />} />
  <Route path="/billing" element={<BillingPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>