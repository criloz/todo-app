__author__ = 'cristian'
from rest_framework.test import APIClient
import django
from ..models import Task
import json
# Using the standard RequestFactory API to create a form POST request
client = APIClient()


task_1 = {"due_date": "2015-09-23",
          "description": "buy pet food"}

task_2 = {"description": "see Inception"}

task_3 = {"description": "clean room", "completed": True, "archived": True}


class TestTaskApi(django.test.TestCase):

    def test_list_tasks(self):
        """
         List tasks (only list unarchived ones)
        :return:
        """

        Task(**task_1).save()
        Task(**task_2).save()
        Task(**task_3).save()

        response = client.get('/api/tasks/')
        self.assertEquals(len(json.loads(response.content.decode('utf-8'))), 2)

    def test_create_new_task(self):
        client.post('/api/tasks/', task_1)
        task = Task.objects.first()
        self.assertEquals(task.due_date.strftime("%Y-%m-%d"), task_1["due_date"])
        self.assertEquals(task.description, task_1["description"])

    def test_update_description(self):
        t = Task(**task_1)
        t.save()

        new_description = "buy pet food in WallMart"
        client.patch('/api/tasks/{0}/'.format(t.pk), {"description": new_description})
        response = client.get('/api/tasks/')
        self.assertEquals(json.loads(response.content.decode('utf-8'))[0]["description"], new_description)

    def test_update_due_date(self):
        t = Task(**task_1)
        t.save()
        new_date = "2015-10-25"
        client.patch('/api/tasks/{0}/'.format(t.pk), {"due_date": new_date})
        response = client.get('/api/tasks/')
        self.assertEquals(json.loads(response.content.decode('utf-8'))[0]["due_date"], new_date)

    def test_set_task_complete(self):
        t = Task(**task_1)
        t.save()
        client.patch('/api/tasks/{0}/'.format(t.pk), {"completed": True})
        response = client.get('/api/tasks/')
        self.assertEquals(json.loads(response.content.decode('utf-8'))[0]["completed"], True)

    def test_archive_task(self):
        """
        after a task is archived, it should not available to the ui
        :return:
        """
        t = Task(**task_1)
        t.save()
        client.patch('/api/tasks/{0}/'.format(t.pk), {"archived": True})
        response = client.get('/api/tasks/')
        self.assertEquals(len(json.loads(response.content.decode('utf-8'))), 0)
