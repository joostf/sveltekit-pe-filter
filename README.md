# Filter with View Transition Flow

select wijzigen  
    ↓  
onChange()  
    ↓  
goto('?type=vegetarisch')  
    ↓  
onNavigate()  
    ↓  
oude pagina-snapshot  
    ↓  
resolve()  
    ↓  
load() haalt gefilterde data op  
    ↓  
nieuwe pizza-cards worden gerenderd  
    ↓  
await navigation.complete  
    ↓  
nieuwe pagina-snapshot  
    ↓  
pizza-cards animeren  