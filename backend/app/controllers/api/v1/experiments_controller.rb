class Api::V1::ExperimentsController < ApplicationController
before_action :find_experiment, only:[:show, :update, :destroy]
  def index
    @experiments = Experiment.all
    render json: @experiments
  end

  def show
    render json: @experiment
  end

  def create

    @experiment = Experiment.new(experiment_params)
    if @experiment.save
        render json: @experiment
    else
      render json:{errors: @experiment.errors.full_messages}
    end
  end

  def update
    if @experiment.update(experiment_params)
      render json: @experiment
    else
      render json:{errors: @experiment.errors.full_messages}
    end
  end

  def destroy
    @experiment.destroy
    render json: @experiment

  end

  private

  def find_experiment
    @experiment = Experiment.find_by_id(params[:id])
  end

  def experiment_params
    params.require(:experiment).permit(:title, :hypothesis)
  end

end
