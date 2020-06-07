class AddSuccessToTrials < ActiveRecord::Migration[6.0]
  def change
    add_column :trials, :success, :integer, default: 0
    add_column :trials, :failure, :integer, default: 0
  end
end
