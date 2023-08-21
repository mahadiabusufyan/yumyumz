export const StatusOptions = [
  { value: 'for-sale', label: 'Sale' },
  { value: 'for-rent', label: 'Rent' },
  { value: 'short-let', label: 'Short Let' },
];

export const ClassOptions = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
];

export const PaymentPerOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

export const ProjectsOptions = [
  { value: 'octavia', label: 'Octavia' },
  { value: 'embassy-gardens', label: 'Embassy Gardens' },
  { value: 'signature', label: 'Signature' },
  { value: 'altitude', label: 'Altitude' },
  { value: 'critirion', label: 'Critirion' },
  { value: 'avant-garde', label: 'Avant Garde' },
  { value: '90s-independence-avenue', label: '90s' },
  { value: 'henriettas', label: 'Henriettas' },
  { value: 'villagio', label: 'Villagio' },
  { value: 'the-grand', label: 'The Grand' },
  { value: 'pinewood', label: 'Pinewood' },
  { value: 'mirage-residence', label: 'Mirage residence' },
  { value: 'rangoon', label: 'Rangoon' },
  { value: 'other', label: 'Other' },
];

export const AdvertiserOptions = [
  { value: 'owner', label: 'Owner' },
  { value: 'agent', label: 'Agent' },
  { value: 'builder', label: 'Builder' },
];

export const CategoryOptions = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  // {
  //   value: 'serviced_apartment',
  //   label: 'Serviced apartment',
  // },
  { value: 'studio', label: 'Studio' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'guesthouse', label: 'Guesthouse' },
  { value: 'flat', label: 'Flat' },
  { value: 'warehouse', label: 'Warehouse' },
];

export const BedroomOptions = [
  { value: 1, label: '1 Bed' },
  { value: 2, label: '2 Beds' },
  { value: 3, label: '3 Beds' },
  { value: 4, label: '4 Beds' },
  { value: 5, label: '5+ Beds' },
];

export const BathroomOptions = [
  { value: 1, label: '1 Bath' },
  { value: 2, label: '2 Baths' },
  { value: 3, label: '3 Baths' },
  { value: 4, label: '4 Baths' },
  { value: 5, label: '5+ Baths' },
];

export const VerifiedAgentOptions = [
  { value: 'true', label: 'Verified' },
  { value: 'false', label: 'Not Verified' },
];

export const RoleOptions = [
  { value: 'agent', label: 'Agent Account' },
  { value: 'user', label: 'Basic Account' },
  // { value: 'semi-furnished', label: 'Semi-furnished' },
];

export const FurnishingOptions = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'semi-furnished', label: 'Semi-furnished' },
];

export const JobModeOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'physical', label: 'In Person' },
];

export const TimeFrameOptions = [
  { value: 'contract', label: 'Contract' },
  { value: 'shortTerm', label: 'Short Term' },
  { value: 'fullTime', label: 'Full Time' },
];

export const ConditionOptions = [
  { value: 'newly-built', label: 'Newly built' },
  { value: 'like-new', label: 'Like New' },
  { value: 'renovated', label: 'Renovated' },
  { value: 'fixer-upper', label: 'Fixer Upper' },
  { value: 'needs-tlc', label: 'Needs TLC' },
  { value: 'move-in ready', label: 'Move-in Ready' },
];

export const ListedByOptions = [
  { value: 'owner', label: 'Owner' },
  { value: 'agent', label: 'Agent' },
  { value: 'builder', label: 'Builder' },
  { value: 'other', label: 'Other' },
];

export const sortOptions = [
  { label: 'Made for you', value: '.asc' },
  { label: 'Price (low to high)', value: 'price.asc' },
  { label: 'Price (high to low)', value: 'price.desc' },
  { label: 'Newest', value: 'timestamp.desc' },
  { label: 'Oldest', value: 'timestamp.asc' },
];
