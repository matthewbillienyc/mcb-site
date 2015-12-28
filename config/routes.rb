Rails.application.routes.draw do
  root 'application#index'
  get '/about' => 'application#about'
  get '/projects' => 'projects#index'
  get '/artistdata' => 'projects#artistdata'
  get '/counterpoint' => 'projects#counterpoint'
  get '/doubletheremin' => 'projects#doubletheremin'
  get '/tonebox' => 'projects#tonebox'
end
