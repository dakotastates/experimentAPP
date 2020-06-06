class Api::V1::TrialsController < ApplicationController
before_action :find_trial, only:[:show, :update, :destroy]
before_action :find_experiment, only:[:index, :create]

def index

  @trials = @experiment.trials
  render json: @trials
end

def create

  @trial = Trial.new(trial_params)
  if @trial.save
      render json: @trial
  else
    render json:{errors: @trial.errors.full_messages}
  end
end

  private

  def find_trial
    @trial = Trial.find_by_id(params[:id])
  end

  def find_experiment
    @experiment = Experiment.find_by_id(params[:experiment_id])
  end

  def trial_params
    params.require(:trial).permit(:experiment_id, :observation)
  end

end
