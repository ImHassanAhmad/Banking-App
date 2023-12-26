import type { LanguageResource } from '@app/i18n/types';

const en: LanguageResource = {
  home: {
    title: 'Welcome to W1TTY Business',
    subtitle: 'Everything you need to run your business in one place',
    login_option_title: 'Log in to your business account',
    login_option_subtitle: 'Enter your account',
    create_option_title: 'Create a new business account',
    create_option_subtitle: 'Get your company onto W1TTY'
  },
  'register-investor': {
    title: 'Create a W1TTY business account',
    subtitle: 'Already have an account?  ',
    signin: 'Sign In',
    continue: 'Continue'
  },
  'register-issuer': {
    title: 'Create a W1TTY business account',
    subtitle: 'Already have an account?  ',
    signin: 'Sign In',
    continue: 'Continue'
  },
  onboarding: {
    title: 'Choose Account Type',
    subtitle: 'Everything you need to run your business in one place',
    login_option_title: 'Create Investor Account',
    login_option_subtitle: 'Join as a Investor',
    create_option_title: 'Create Issuer Account',
    create_option_subtitle: 'Join as a Issuer'
  },
  login: {
    title: 'Welcome to W1TTY Business',
    subtitle: 'New at W1TTY?',
    signup: 'Sign Up',
    email_input_label: 'Enter your e-mail address',
    password_input_label: 'Password',
    forgot_password: 'Forgot Password?',
    login: 'Login',
    created_title: 'Your account is created',
    created_subtitle: 'Log in to your W1TTY account'
  },
  'select-country': {
    issuer_title: 'Select country of incorporation',
    issuer_subtitle: 'What country is your business legally incorporated in?',
    investor_title: 'Select country of residence',
    investor_subtitle: 'Which country are your located in?',
    placeholder: 'Select country',
    continue: 'CONTINUE',
    by_registering: 'By registering, you accept our ',
    terms_of_use: 'Terms of us',
    and: ' and ',
    privacy_policy: 'Privacy Policy'
  },
  'register-mobile': {
    title: 'Phone number',
    subtitle: 'Enter phone number. We’ll send you a confirmation code',
    continue: 'CONTINUE'
  },
  'register-email': {
    title: 'E-mail',
    subtitle: 'Enter the email address you want to use to open an account',
    email_input_label: 'Enter your e-mail address',
    password_input_label: 'Password',
    continue: 'CONTINUE'
  },
  'create-password': {
    title: 'Create password',
    subtitle: 'This password will be used to long into your account',
    email_input_label: 'Password',
    continue: 'CONTINUE',
    password_must_have: 'Your password must have',
    weak_password: 'Weak password',
    average: 'Average',
    strong_password: 'Strong password',
    '8_or_more': '8 or more characters',
    create_account: 'CREATE ACCOUNT',
    password_input_label: 'Password',
    '13_or_more': 'Password should 13 or more characters and unique to you',
    at_least_one_small_letter: 'At least one small letter',
    at_least_one_capital_letter: 'At least one capital letter',
    at_least_one_number: 'At least one number',
    at_least_one_special: 'At least one special character'
  },
  'verify-mobile': {
    title: 'Phone Confirmation',
    subtitle: "Enter the code we've sent to {{phone}}",
    resend_code: 'Resend code after ',
    code_by_whatsapp: 'Receive Code by WhatsApp',
    code_by_phone: 'Receive Code by Phone call',
    disclaimer:
      'By clicking one of the buttons above, you agree to receive messages and calls from W1TTY with One Time Passcode (OTP)',
    code_not_received: 'I did not receive a code'
  },
  'verify-email': {
    title: 'E-mail confirmation',
    subtitle: 'Enter the code we’ve sent to {{email}}',
    resend_code: 'Resend Code',
    wrong_code: 'Wrong code. Please try again.'
  },
  'email-already-registered': {
    title: 'This email is already registered',
    subtitle: 'Please sign in to your existing account.',
    login: 'Login'
  },
  'error-or-warning-modal': {
    title: 'Something went wrong',
    subtitle: 'Sorry, something went wrong. Please try again later or contact support for help.',
    ok: 'Ok'
  },
  'account-statement-modal': {
    title: 'Statement',
    from: 'From',
    to: 'To',
    note: 'Statements must have a range less than a year',
    this_year: 'This year',
    last_12_months: 'Last 12 months',
    last_6_months: 'Last 6 months',
    last_quater: 'Last quater',
    ok: 'Ok'
  },
  'country-not-supported': {
    title: 'We’re not in your country yet',
    subtitle:
      'Thanks for your interest in joining W1TTY Business! {{name}} will soon be one of the many countries where W1TTY Business operates.',
    change: 'CHANGE COUNTRY'
  },
  'region-not-supported': {
    title: 'We’re not in your region yet',
    subtitle: 'Phone numbers from this region is not supported.',
    change: 'CHANGE REGION'
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Valid as of September 14, 2021',
    who_we_are: 'Who we are?',
    description: `W1TTY is committed to protecting your privacy. The effective management of all personal data, including its security and confidentiality, lies at the very heart of our business and underpins our practices and processes. We collect, use and are responsible for certain personal data about you. When we do so we are subject to applicable data protection laws and we are responsible as ‘controller’ of that personal data for the purposes of those laws.
    This Privacy Policy, also called a Privacy Notice ("the Notice"), describes how we use your personal data when you interact with us via our Website (w1tty.com) or our App, communicate with us, or use our products and/or services. It also explains your rights in relation to your personal data and how to contact us or supervisory authorities in the event you have a query or complaint.

    Your personal data is collected by WITTY GLOBAL UAB ("WITTY"/ "we" / "us" / "our"), a legal entity registered in Lithuania with its legal entity code 305433923, registration address Jogailos g. 9, Vilnius, Lithuania.

    Contact details of the data protection officer
    In case of any questions regarding the processing of your personal data, please contact the Data Protection Officer by e-mail: contact@w1tty.com, or by post: Didžioji g. 18, LT-01128 Vilnius, Lithuania.

    To whose personal data does this Notice apply?

    This Notice describes our practices when using the personal data of:
    Users who register to use our products and/or services ("Users"); and
    Individuals who visit our Website, use our App, or otherwise interact with our products and/or services.
    Keeping your personal data secure
    We have appropriate security measures in place to prevent personal data from being accidentally lost or used or accessed unlawfully. We also have procedures in place to deal with any data breach.
    Data collection and usage
    We will collect, store and use your personal data for the purposes set out in more detail in this section.
    Your information may be shared with some third parties as set out in more detail below.
    Users of our products and/or services
    Information we collect about Users
    We collect most of our personal data directly from our Users, by telephone, post or email and/or via our Website / App. The categories of personal data we collect may include (the actual scope of personal data that we collect always depends on the situation):
    Identification data: first name, surname, personal identification number, date of birth, information specified in the identification document (passport or ID card), parents/guardians (if services provided to a minor).
    Contact data: address, telephone number, email address.
    Financial data: e-money account number, incoming and outgoing payments and information included thereof, transaction history, obligations.
    Data on education and professional activity: education (institution, degree, etc.), place of work, profession, position, occupation and other related information.
    Data obtained and/or created while performing an obligation arising from law: data that WITTY may be required to report to authorities, such as tax authorities (e.g. country of birth, residence, taxpayer number, nationality, place of tax residence), courts, law enforcement agencies including details of income, credit commitments, property holdings, remarks, and debt balances.
    Data obtained and/or created while performing an obligation arising from the laws on the prevention of money laundering and terrorist financing: origin of funds, bank accounts, payment documents, assets, their types and value, expenses and income, purpose of account, current/former job, economic and commercial activities and other sources of income, PEP status; information received during in-depth customer research (information on business partners and business activity, cash flow, reliable information publicly available on the Internet, information obtained in screenings against sanction lists, PEP status, etc.)
    Data related to contractual obligations and products/services received from WITTY: information included in the agreements made with WITTY (conditions, fees, terms, description of services, etc.).
    Data used for direct marketing: email address, phone number, push notifications on WITTY's App installed on a smart device.
    Data obtained through communication with WITTY: Information obtained from letters, emails, telephone conversations, etc. during communication with WITTY.
    Special Categories of Personal Data: such as racial or ethnic origin, religious or philosophic beliefs, political opinions, genetic, biometric data, health state data, data relating to criminal convictions and offences. To be able to provide the services, WITTY in some cases will be required to process special categories of personal data.
    Data related to the usage of WITTY App and/or WITTY's website: cookies and data received while using the app or browsing the website, e.g.: location, device, IP address, type of browser.
    Audio-visual data: video recordings when you become our client; video and/or audio recordings when you call at us or video-chat via WITTY App.
    Data obtained to meet regulatory requirements: data obtained from inquiries of notaries, bailiffs, law enforcement authorities and so forth.
    We may also collect information from other sources such as directly from a third party (e.g. sanctions screening providers) and public registers or other accessible sources (e.g. social media websites). If the situation requires, we can process other personal data.
    How we use the personal data we collect about Users
    We use personal data from Users to:
    provide services to you (open an e-money account, perform payment services, issue and maintain payment cards, mobile application services, etc.). For this purpose, we process identification data, contact data, data related to contractual obligations and products/services received from WITTY, financial data, data related to the usage of WITTY App and/or WITTY's website, data obtained through communication with WITTY.
    perform obligations arising from laws on the prevention of money laundering and terrorist financing, automatic data exchange on tax residency (CRS, FATCA), fighting tax evasion crimes (DAC6) and others. For this purpose, we process identification data, contact data, data obtained and/or created while performing an obligation arising from the laws on the prevention of money laundering and terrorist financing, data on education and professional activity, data obtained and/or created while performing an obligation arising from law (CRS/FATCA/DAC6).
    assess and prevent risks associated with services provided to you (fraud prevention, prevention of money laundering and terrorist financing operations). For this purpose, we process identification data, contact data, data obtained and/or created while performing an obligation arising from law, financial data, data obtained and/or created while performing an obligation arising from the laws on the prevention of money laundering and terrorist financing, data on education and professional activity, data obtained through communication with WITTY.
    provide direct marketing materials to you. For this purpose, we process identification data (only, name), contact data (only, email address and data to sent you push notifications on your smart device).
    to carry out internal analysis and research to help us improve our products and/or services (e.g. statistical data). For this purpose, we process data and information that does not include any personal data.
    Why we use the personal data of Users
    We use this information because:
    it is necessary to enter into or perform our contract with Users (for example, opening an account, maintaining your account, and operating services connected with your account);
    it is necessary to comply with legal or regulatory requirements (including undertaking screening for financial or other sanctions and conducting checks to identify you and verify your identity);
    it is necessary for the purposes of our or a third party's legitimate interests. A legitimate interest will apply only where we consider that it is not outweighed by a User's interests or rights which require protection of their personal data. We have the following legitimate interests to use User's information:
    understanding how our User's engage with our products and/or services;
    providing and improving our products and/or services, including understanding and responding to feedback; and
    ensuring the security of our organization, our Website / App and our products and/or services.
    if we process your sensitive personal data, we will only do so on the basis that we have obtained your explicit consent to carry out such processing or we are allowed and obliged to process such data by law.
    Generally, we do not rely on consent as a legal basis for processing your personal data other than in relation to sending marketing communications to you (for example, via online banners, emails or text messages) and in respect of sensitive personal data.
    How we obtain your personal data
    We obtain your personal data from the following sources:
    from you: while applying for products and services; while addressing us by mail, email, over the phone, etc.; when you use our products and services; while using our App or visiting our Website.
    from third parties: our counterparties which provide us with information related to you; other WITTY Group companies; entities managing public registers; state institutions and law enforcement agencies; persons in relation to contracts and transactions which these persons intend to conclude or have concluded with WITTY.
    Marketing consent
    We process your personal data for a direct marketing purpose only with your consent.
    We will only send marketing communications to you if you actively opt-in to receive them, either via agreeing to push notifications in the App, and/or by consenting to marketing through non-App based channels (during the application process or any time thereafter). Non-App based channels include email, telephone, post and direct messages online (e.g. through social media).
    You can withdraw your consent to receive such marketing communications at any time by changing your App settings for push notifications. This link will allow you to opt-out of all marketing through non-App channels, or select specific channels to opt-out of, leaving consent in place for direct marketing through your preferred channels. A reminder of the link will be provided in all non-App marketing communications.
    Push notifications
    We may provide information to you through WITTY App’s push notifications. Push notifications are messages you receive on your smartphone or other smart devices without a specific request and regardless of whether WITTY App is opened or not. We will only send you marketing push notifications if you expressly consent to this as you open an account. Once you created your account you can also give your consent to receive marketing push notifications in the App settings. You can revoke your consent to receive push notifications for marketing purposes at any time. The revocation can be made in the App settings.
    Profiling
    If we should use the possibility of a fully automated person related decision in order to provide our services fast and easy and if it is legally required, we will inform you upfront. You have the right that an individual person is reviewing the result of this automated decision. We process your personal data partially automated to assess certain personal aspects (profiling).
    Recipients of User contact information
    We may disclose User personal data to third parties as follows:
    to companies within the company group, a part of which is Witty Global UAB;
    to other users of the products and/or services where you have provided your approval or where you have posted information online which is publicly available;
    to our professional advisers, suppliers or service providers (such as auditors, consultants, lawyers, insurers, marketing agencies and website hosts);
    to third parties including for the purpose of providing the products and/or services;
    to third parties such as banks, tax authorities, courts, regulators and security or police authorities where required or requested by law, or where we consider it necessary (e.g. to help trace funds where you are a victim of suspected financial crime and you have agreed for us to do so, or where we suspect funds have entered your account because of a financial crime);
    in the event that any additional authorized users are added to your account, we may share information about the use of the account by any authorized user with all other authorized users;
    if we are defending a legal claim, User information may be processed as required in connection with a claim;
    if we discuss selling or transferring part or all of our organization – the information may be transferred to prospective purchasers under suitable terms as to confidentiality; and
    if we are reorganized or sold, information may be transferred to a buyer who can continue the work of our organization.
    We only allow third parties to handle your personal data if we are satisfied that they take appropriate measures to protect your personal data.
    Legal requirements
    In certain circumstances, if you do not provide personal data which is required, we will not be able to perform our obligations under the contract with you or may not be able to provide you with our products and/or services. We will make it clear if and when this situation arises and what the consequences of not providing the information will be for you.
    Your personal data may also be processed if it is necessary on reasonable request by a law enforcement or regulatory authority, body or agency or in the defense of a legal claim. We will not delete personal data if it is relevant to an investigation or a dispute. It will continue to be stored until those issues are fully resolved.
    How long do we keep your information?
    We will keep your information for as long as it is reasonably necessary to fulfil the purposes we collected it for, including as necessary to comply with legal, regulatory, accounting or reporting requirements.
    To determine the appropriate retention period for your personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, as well as the applicable legal and regulatory requirements, e.g.:
    We process the data collected in connection with the provision of financial services during the period of business relationship between you and us, and retain the data for a further 10 years after the cancel of business relationship;
    Data of a consent for marketing purposes - 3 years from the date of the consent;
    Data of persons related to legal entities, i.e. managers, representatives, shareholders, etc.), where such person does not have any personal agreements W1TTY, for a further 10 years since the end of business relationship with the legal entity;
    Recorded phone calls, video-chats and text-chats are stored for a further 10 years after the recording date;
    We will also routinely refresh our information to ensure we keep it up-to-date. When it is no longer necessary to retain your personal data, we will delete or anonymize it.
    Where your information will be held
    We ensure that your personal data is stored in the territory of the European Union ("EU”) and the European Economic Area ("EEA”). Given the global nature of financial services and technological solutions and to process your personal data for the purposes specified in this Notice, for the provision of individual services your personal data may be transferred outside the EU and the EEA. Where we transfer your data outside of the EU and the EEA we will make sure that adequate safeguards are in place, such as European Commission-approved Standard Contractual Clauses.
    Your Rights
    To the extent provided for under applicable law, you have the following rights in relation to your information, which you can exercise free of charge. Some of these rights will only apply in certain circumstances.
    Withdraw Consent: where we have collected your consent – for example, to use cookies when you visit our Website.
    Access: you are entitled to ask us if we are processing your information and, if we are, you can request access to your personal data. This enables you to receive a copy of the personal data we hold about you and certain other information about it.
    Correction: you are entitled to request that any incomplete or inaccurate personal data we hold about you is corrected.
    Erasure: you are entitled to ask us to delete or remove personal data in certain circumstances. There are certain exceptions where we may refuse a request for erasure, for example, where the personal data is required for compliance with law or in connection with legal claims.
    Restriction: you are entitled to ask us to suspend the processing of certain of your personal data about you, for example if you want us to establish its accuracy or the reason for processing it.
    Transfer: you may request the transfer of certain of your personal data to another party.
    Not to be subject to automated individual decision-making: you may ask not to be subject to a decision based solely on automated processing (including profiling) that produces legal effects concerning you or similarly significantly affects you.
    We would hope that our Data Protection Officer can resolve any query you may raise about our use of your information. However, you also have a right to lodge a complaint with a supervisory authority (data protection regulator), in particular in the country in the EEA where you are habitually resident, where we are based or where an alleged infringement of data protection law has taken place.
    Right to object
    In addition to the rights above, you also have a right to object to us processing your information in certain circumstances. Where we are processing your personal data based on legitimate interests you may challenge this. However, we may be entitled to continue processing your information based on our compelling legitimate grounds or where this is relevant to legal claims. You also have the right to object where we are processing your data in order to send you any direct marketing.
    For further information on each of those rights, including the circumstances in which they apply, please contact us or refer to the information issued by The State Data Protection Inspectorate.
    If you want to exercise any of these rights, please contact us in writing, providing us with enough information to identify you (e.g. your full name, address and account number), proof of your identity and address (a copy of your driving license or passport and a recent utility bill or bank account statement), and the specifics of the right you want to exercise.
    How to exercise your rights
    We take every effort to support you in exercising your rights and to answer any questions you may have about the information contained in this Notice. You may submit a request regarding the exercise of the above-indicated rights as well as any complaint, notification or request to us by e-mail: contact@w1tty.com; by post: Didžioji g. 18, LT-01128 Vilnius, Lithuania.
    If for the purpose of drafting a reply it is necessary to provide confidential information or information that constitutes the bank secrecy, we may ask you to confirm your identity.
    We will provide a response to your request no later than within 30 calendar days since the date of the receipt of your request. In exceptional circumstances requiring additional time, we will, upon notifying you, have the right to extend the deadline for the submission of the requested data or other requirements specified in your application up to 60 calendar days since the date of your request.
    Links to third party website
    Our Website, our App, our products and/or services and other communications may, from time to time, contain links to third party websites.
    The personal data that you provide through these websites is not subject to this Notice and the treatment of your personal data by such websites is not our responsibility. If you follow a link to any of these websites, please note that these websites have their own privacy policies / notices which will set out how your information is collected and processed when visiting those sites.
    Children
    Our Website and App are not aimed at children under the age of 18. If you are under 18 years old, you should not submit any personal data to us via our Website or our App without checking with your parent or guardian.
    Modifications to the Notice
    This Notice may be changed from time to time. If we change anything important about this Notice (the information we collect, how we use it or why we use it) we will highlight those changes at the top of the Notice and provide a prominent link to it for a reasonable length of time following the change (and prior to the change taking effect if deemed necessary).`
  },
  'about-our-services': {
    title: 'About our services',
    subtitle: 'Please read and agree to our service documents to open your account.',
    news_promotions:
      'I would like to keep up with W1TTY news, promotions and personalised deals via any of my provided information.',
    agree: 'I’ve read and agree to ',
    terms_conditions: 'Terms and Conditions',
    privacy_policy: 'Privacy Policy',
    visa_card_policy: 'VISA Card Terms & Conditions',
    prices_limits: 'Prices & Limits',
    select_all: 'Select All',
    confirm: 'Confirm'
  },
  'business-category': {},
  'source-of-funding': {
    title: 'Source of funding',
    subtitle: '[subtitle here]',
    revenue: 'Revenue',
    loans_credits: 'Loans/credits',
    donations: 'Donations',
    dividend_from_branches: 'Dividend from branches',
    financial_support: 'Financial support from state / international bodies',
    sales_of_goods: 'Sales of goods',
    other: 'Other',
    continue: 'Continue'
  },
  '*': {
    title: '404',
    sub_title: 'Page Not Found',
    go_back: ' Go to Home'
  },

  help: {},
  'company-information': {
    title: 'Company informations',
    subtitle: 'We need your business details to open your account',
    registration_number: 'Registration number',
    company_name: 'Company name',
    date_of_register: 'Date of register',
    continue: 'Continue'
  },
  'business-description': {
    title: 'Describe your business',
    subtitle: '',
    placeholder: 'Business description',
    continue: 'Continue'
  },
  'business-regulation': {
    title: 'Is your business regulated?',
    subtitle: ''
  },
  'business-revenue': {
    title: 'Annual Revenue',
    subtitle: ''
  },
  'business-turnover': {
    incoming_title: 'Turnover for incoming transactions',
    outgoing_title: 'Turnover for outgoing transactions'
  },
  'upload-documents': {},
  'income-range': {
    title: 'Income Range'
  },
  'personal-information': {
    title: 'Personal Information',
    subtitle: '',
    first_name: 'First Name',
    last_name: 'Last Name',
    DOB: 'DOB',
    continue: 'Continue'
  },
  address: {
    title: 'Personal Information',
    postal_code: 'Postal Code',
    city: 'City',
    street: 'Street',
    houseNo: 'House No.',
    continue: 'Continue'
  },
  'questions-list': {
    title: 'Questions',
    subtitle: '',
    news_promotions:
      'I would like to keep up with W1TTY news, promotions and personalised deals via any of my provided information.',
    agree: 'I’ve read and agree to ',
    terms_conditions: 'Terms and Conditions',
    privacy_policy: 'Privacy Policy',
    visa_card_policy: 'VISA Card Terms & Conditions',
    prices_limits: 'Prices & Limits',
    select_all: 'Select All',
    confirm: 'Confirm'
  },
  'create-asset-token': {
    create_new_asset: 'Create new Asset',
    continue: 'Continue',
    token_name: 'Token Name (On Block Chain)',
    token_symbol: 'Token Symbol (On Block Chain)',
    total_supply: 'Total Supply (Mint)',
    decimal_number: 'Number of Decimals Allowed',
    token_config_pausable: 'pause',
    token_config_mint: 'mint',
    token_config_burn: 'burn',
    token_config_capped: 'capped',
    buy_token: 'Token Buy Now Price',
    currency: 'Currency',
    upload_logo: 'Upload Logo',
    token_basic_info: 'Token Basic Information',
    token_config: 'Token Configuration',
    token_price: 'Token Price'
  }
};

export default en;
