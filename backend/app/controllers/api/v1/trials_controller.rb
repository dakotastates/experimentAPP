class Api::V1::TrialsController < ApplicationController
before_action :find_trial, only:[:show, :update, :destroy]
before_action :find_experiment, only:[:index]

def index

  @trials = @experiment.trials
  render json: @trials
end

  private

  def find_trial
    @trial = Trial.find_by_id(params[:id])
  end

  def find_experiment
    @experiment = Experiment.find_by_id(params[:experiment_id])
  end

  def trial_params
    params.require(:trial).permit(:observation)
  end

end
