class CreateTrials < ActiveRecord::Migration[6.0]
  def change
    create_table :trials do |t|
      t.belongs_to :experiment, null: false, foreign_key: true
      t.text :observation

      t.timestamps
    end
  end
end
