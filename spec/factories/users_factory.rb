FactoryBot.define do
  factory :user do
    name { 'Test User' }
    sequence(:email) { |n| "user#{n}@rails.boilerplate.com" }
    password { 'Password123!' }
    confirmed_at { Time.current }

    trait :support do
      after(:create) { |user| user.add_role(:support) }
    end

    trait :admin do
      sequence(:email) { |n| "admin#{n}@rails.boilerplate.com" }
      after(:create) { |user| user.add_role(:admin) }
    end
  end
end
