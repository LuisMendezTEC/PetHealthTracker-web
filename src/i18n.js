import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector) // Detecta automáticamente el idioma del navegador
  .use(initReactI18next) // Permite usar i18n con React
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            es: "Spanish",
            en: "English",
            clients: "Clients",
            appointments: "Appointments",
            records: "Records",
            dashboard: "Dashboard",
            logout: "Logout",
            toggleTheme: "Toggle Theme",
          },
          appointmentsCard: {
            date: "Date",
            time: "Time",
            vetId: "Vet ID",
            complete: "Complete Appointment",
          },
          appointmentsList: {
            title: "Appointments",
            loading: "Loading...",
          },
          appointmentsModal: {
            complete: "Complete Appointment",
            type: "Type",
            reason: "Reason",
            result: "Result",
            cancel: "Cancel",
            save: "Save",
          },
          clientList: {
            title: "Clients",
            pets: "Pets",
            breed: "Breed",
            date: "Birthdate",
          },
          historyList: {
            history: "Pet history",
            pet: "Pet",
            unknown_pet: "Unknown pet",
            owner: "Owner",
            date: "Date",
            breed: "Breed",
            type: "Type",
            description: "Description",
            result: "Result",
            loading: "Loading...",
          },

          supportChat: {
            technical_support: "Technical Support for Vets",
            manage_appointments: "Manage appointments",
            view_medical_records: "View medical records",
            enable_dark_mode: "Enable dark mode",
            technical_problem: "Technical problem",
            another_query: "Make another query",
            end_chat: "End chat",
            describe_issue: "Describe your issue or query...",
            send: "Send",
            citas:
              "Are you having trouble managing your appointments? You can go to the 'Appointments' section in the main menu. Let me know if you need a more detailed guide.",
            historiales:
              "To access patient records, go to 'Records' from the menu. Is there something specific you need help with in this section?",
            modoOscuro:
              "To switch the app theme to dark mode, use the theme switch in the upper corner. Would you like additional assistance with customization?",
            problemas:
              "We're sorry you're experiencing issues. Please describe the problem or error, and a developer will help you resolve it as soon as possible.",
            general:
              "Thank you for your message. A member of our technical support team will assist you shortly.",
            text: "Hello 👋 How can we assist you today? Select an option or type your query:",
            gestionar_cita: "How can I manage my appointments?",
            ver_historiales: "How can I view medical records?",
            activar_modo_oscuro: "How can I enable dark mode?",
            problemas_tecnicos: "I have a technical problem",
          },
          appointments: {
            page_title: "Appointments",
            page_subtitle: "View and manage registered appointments",
            error_message: "Error",
            loading_appointments: "Loading appointments...",
            no_appointments: "No appointments to show",
            no_appointments_action: "Perform an action to see results",
          },
          clients: {
            page_title: "Clients",
            page_subtitle: "View and manage the list of registered clients",
            error_message: "Error",
            loading_data: "Loading data...",
            no_data: "No data to show",
            no_data_action: "Perform an action to see results",
          },
          dashboard: {
            page_title: "Admin Dashboard",
            scheduled_appointments: "Scheduled Appointments",
            completed_appointments: "Completed Appointments",
            pending_appointments: "Pending Appointments",
            active_users: "Active Users",
            clients: "Clients",
            staff: "Staff",
            total_pets: "Total Pets",
            avg_appointments_per_vet: "Average Appointments per Vet",
            generate: "Generate PDF",
          },

          pdfGenerator: {
            report_title: "Dashboard Report",
            appointment_summary: "Appointment Summary",
            scheduled_appointments: "Scheduled Appointments",
            completed_appointments: "Completed Appointments",
            pending_appointments: "Pending Appointments", 
            active_users: "Active Users",
            clients: "Clients",
            staff: "Staff",
            total_pets: "Total Pets",
            avg_appointments_per_vet: "Average Appointments per Vet",
            generated_by: "Generated by",
            the: "on",
            generate: "Generate PDF",
          },

          history: {
            page_title: "Medical Records",
            page_subtitle:
              "View the medical records associated with your account",
            error_message: "Error",
            loading_histories: "Loading histories...",
            no_histories: "No histories to show",
            no_histories_action:
              "Histories associated with your account will appear here",
          },
          login: {
            page_title: "Admin Dashboard",
            registering: "Registering",
            welcome: "Welcome",
            create_account: "Create your account",
            login_account: "Log in to your account",
            name_label: "Name",
            role_label: "Role",
            email_label: "Email",
            password_label: "Password",
            select_role: "Select a role",
            veterinarian_role: "Veterinarian",
            receptionist_role: "Receptionist",
            register_button: "Register",
            login_button: "Log in",
            already_have_account: "Already have an account? Log in",
            no_account: "Don't have an account? Register",
            loading: "Loading...",
          },
          useProfile: {
            page_title: "User Profile",
            page_subtitle: "Detailed information of the registered user",
            error_message: "Error",
            loading_user_info: "Loading user information...",
            no_user_info: "No user information to show",
            user_data: "User Data",
            name: "Name",
            email: "Email",
            role: "Role",
            registered_on: "Registered on",
          },
        },
      },
      es: {
        translation: {
          nav: {
            es: "Español",
            en: "Inglés",
            clients: "Clientes",
            appointments: "Citas",
            records: "Historiales",
            dashboard: "Panel",
            logout: "Cerrar Sesión",
            toggleTheme: "Cambiar Tema",
          },
          appointmentsCard: {
            date: "Fecha",
            time: "Hora",
            vetId: "ID Veterinario",
            complete: "Completar Cita",
          },
          appointmentsList: {
            title: "Citas",
            loading: "Cargando...",
          },
          appointmentsModal: {
            complete: "Completar Cita",
            type: "Tipo",
            reason: "Motivo",
            result: "Resultado",
            cancel: "Cancelar",
            save: "Guardar",
          },
          clientList: {
            title: "Clientes",
            pets: "Mascotas",
            breed: "Raza",
            date: "Fecha de nacimiento",
          },
          historyList: {
            history: "Historial de mascotas",
            pet: "Mascota",
            unknown_pet: "Mascota desconocida",
            owner: "Dueño",
            date: "Fecha",
            breed: "Raza",
            type: "Tipo",
            description: "Descripción",
            result: "Resultado",
            loading: "Cargando...",
          },
          supportChat: {
            technical_support: "Soporte Técnico para Veterinarios",
            manage_appointments: "Gestión de citas",
            view_medical_records: "Ver historiales médicos",
            enable_dark_mode: "Activar modo oscuro",
            technical_problem: "Problema técnico",
            another_query: "Realizar otra consulta",
            end_chat: "Terminar chat",
            describe_issue: "Describe tu problema o consulta...",
            send: "Enviar",
            citas:
              "¿Tienes problemas para gestionar tus citas? Puedes ir a la sección de 'Citas' en el menú principal. Déjame saber si necesitas una guía más detallada.",
            historiales:
              "Para acceder a los historiales de pacientes, ve a 'Historiales' desde el menú. ¿Hay algo específico con lo que necesitas ayuda en esta sección?",
            modoOscuro:
              "Para cambiar el tema de la aplicación a modo oscuro, utiliza el interruptor de tema en la esquina superior. ¿Te gustaría asistencia adicional con la personalización?",
            problemas:
              "Lamentamos que estés experimentando problemas. Por favor, describe el problema o el error y un desarrollador te ayudará a resolverlo lo antes posible.",
            general:
              "Gracias por tu mensaje. Un miembro de nuestro equipo de soporte técnico te asistirá en breve.",
            text: "Hola 👋 ¿En qué podemos ayudarte hoy? Selecciona una opción o escribe tu consulta:",
            gestionar_cita: "¿Cómo gestionar mis citas?",
            ver_historiales: "¿Cómo ver los historiales médicos?",
            activar_modo_oscuro: "¿Cómo activar el modo oscuro?",
            problemas_tecnicos: "Tengo un problema técnico",
          },
          appointments: {
            page_title: "Citas",
            page_subtitle: "Consulta y gestiona las citas registradas",
            error_message: "Error",
            loading_appointments: "Cargando citas...",
            no_appointments: "No hay citas para mostrar",
            no_appointments_action:
              "Realiza una acción para ver los resultados",
          },
          clients: {
            page_title: "Clientes",
            page_subtitle:
              "Consulta y gestiona la lista de clientes registrados",
            error_message: "Error",
            loading_data: "Cargando datos...",
            no_data: "No hay datos para mostrar",
            no_data_action: "Realiza una acción para ver los resultados",
          },
          dashboard: {
            page_title: "Panel de Administración",
            scheduled_appointments: "Citas Programadas",
            completed_appointments: "Citas Realizadas",
            pending_appointments: "Citas Pendientes",
            active_users: "Usuarios Activos",
            clients: "Clientes",
            staff: "Personal",
            total_pets: "Total de Mascotas",
            avg_appointments_per_vet: "Promedio de Citas por Veterinario",
            generate_pdf: "Generar PDF",
          },

          pdfGenerator: {
            report_title: "Reporte del Dashboard",
            appointment_summary: "Resumen de Citas",
            scheduled_appointments: "Citas Programadas",
            completed_appointments: "Citas Realizadas",
            pending_appointments: "Citas Pendientes",
            active_users: "Usuarios Activos",
            clients: "Clientes",
            staff: "Personal",
            total_pets: "Total de Mascotas",
            avg_appointments_per_vet: "Promedio de Citas por Veterinario",
            generated_by: "Generado por",
            the: "el",
            generate: "Generar PDF",
          },

          history: {
            page_title: "Historiales Clínicos",
            page_subtitle:
              "Consulta los historiales clínicos asociados a tu cuenta",
            error_message: "Error",
            loading_histories: "Cargando historiales...",
            no_histories: "No hay historiales para mostrar",
            no_histories_action:
              "Los historiales asociados a tu cuenta aparecerán aquí",
          },
          login: {
            page_title: "Dashboard de Administración",
            registering: "Registrarse",
            welcome: "Bienvenido",
            create_account: "Crea tu cuenta",
            login_account: "Ingresa a tu cuenta",
            name_label: "Nombre",
            role_label: "Puesto",
            email_label: "Correo electrónico",
            password_label: "Contraseña",
            select_role: "Seleccione un puesto",
            veterinarian_role: "Veterinario",
            receptionist_role: "Recepcionista",
            register_button: "Registrarse",
            login_button: "Iniciar Sesión",
            already_have_account: "¿Ya tienes cuenta? Iniciar Sesión",
            no_account: "¿No tienes cuenta? Registrarse",
            loading: "Cargando...",
          },
          useProfile: {
            page_title: "Perfil del Usuario",
            page_subtitle: "Información detallada del usuario registrado",
            error_message: "Error",
            loading_user_info: "Cargando información del usuario...",
            no_user_info: "No hay información del usuario para mostrar",
            user_data: "Datos del Usuario",
            name: "Nombre",
            email: "Correo",
            role: "Rol",
            registered_on: "Registrado el",
          },
        },
      },

      fallbackLng: "en", // Idioma por defecto si no se encuentra una traducción
      interpolation: {
        escapeValue: false, // React ya protege de XSS
      },
    },
  });

export default i18n;