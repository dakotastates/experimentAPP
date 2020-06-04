class CreateExperiments < ActiveRecord::Migration[6.0]
  def change
    create_table :experiments do |t|
      t.string :title
      t.text :hypothesis

      t.timestamps
    end
  end
end
