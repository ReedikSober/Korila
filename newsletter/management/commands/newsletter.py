from django.core.management.base import BaseCommand
from django.core.mail import get_connection, EmailMessage
from django.conf import settings
from website.models import UserSelection


class Command(BaseCommand):
    help = 'Generate and send monthly newsletters'

    def handle(self, *args, **options):
        # Retrieve user selections
        user_selections = UserSelection.objects.all()

        # Set up the file-based email backend
        connection = get_connection(
            backend='django.core.mail.backends.filebased.EmailBackend',
            file_path=settings.EMAIL_FILE_PATH
        )

        for selection in user_selections:
            user = selection.user
            selected_plants = selection.selected_plants.all()

            # Generate personalized newsletter content based on selected plants
            newsletter_content = f"Hello {user.username}, here are your selected plants:\n"
            for plant in selected_plants:
                newsletter_content += f"- {plant.name}\n"

            # Create the email message
            email = EmailMessage(
                subject='Monthly Newsletter',
                body=newsletter_content,
                from_email='your_email@example.com',
                to=[user.email],
                connection=connection,
            )

            # Send the email
            email.send()

        # Print success message
        self.stdout.write(self.style.SUCCESS('Newsletter emails sent successfully.'))
