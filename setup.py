from setuptools import setup

setup(name='messaging-app',
      version='0.1',
      description='This is a basic chat app using Flask',
      author='Sahil Batla',
      author_email='sahilbathla1@gmail.com',
      license='MIT',
      packages=['messaging_app'],
      include_package_data=True,
      install_requires=[
          'Flask==0.12.2',
      ],
      zip_safe=False)