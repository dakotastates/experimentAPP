class Experiment < ApplicationRecord
  validates :title, presence: true
  validates :hypothesis, presence: true
  has_many :trials
end
