#CITS1401 PROJECT
#NAME - YOGENDER
#UWA STUDENT ID = 23871801
#Main function that opens file and read lines
def main(csvfile, region):
    with open(csvfile, 'r') as f:
        data = [clmn.strip().split(',') for clmn in f.readlines()]
# 
    def MaxMin():
        #This finds out countries with maximum and minimum population with positive netchange 
        countries = []
        for clmn in data:#
            if clmn[5] == region and int(clmn[3]) > 0:#
                countries.append(clmn)

        if len(countries) == 0:
            return 0
#      
        def get_population(country):
            
            return int(country[1])
        max_country = max(countries, key=get_population)#
        min_country = min(countries, key=get_population)#
        MaxMin=[max_country[0], min_country[0]]
        return MaxMin

     
    def stdvAverage():#This first calculates the average and using it calculates standard deviation 
        countries = []
         
        for clmn in data:#reads the data to append the countries in that region
            if clmn[5] == region:
                countries.append(int(clmn[1]))#

        avg_population = sum(countries) / len(countries)#
        std_dev_population = ((sum([(i - avg_population) ** 2 for i in countries])) / (len(countries) -1)) ** 0.5
        stdvAverage = [round(avg_population, 4), round(std_dev_population, 4)]
        return stdvAverage


    def density(): #This takes out density 
        def get_density(country):
            return country[1]
        countries = [] 
        for clmn in data:#reads the data to append the countries in that region
            if clmn[5] == region:
                
                density = int(clmn[1]) / int(clmn[4])
                countries.append([clmn[0], round(density, 4)])
        #For sorting the list
        density = sorted(countries, key=get_density, reverse=True)
        return density

    def corr(): #This function will calculate the correlation coefficient
        population = []
        area = []
        for clmn in data[1:]:
            if clmn[5] == region:
                population.append(int(clmn[1]))
                area.append(int(clmn[4]))

        if len(population) == 0 or len(area) == 0:
            return [] 
        sum_of_population = sum(population)
        sum_of_area = sum(area)
        sum_of_population_squared = sum([i ** 2 for i in population])
        sum_of_area_squared = sum([i ** 2 for i in area])
        sum_of_population_area = sum([population[i] * area[i] for i in range(len(population))])
        n = len(population)

        numerator = n * sum_of_population_area - sum_of_population * sum_of_area
        denominator = ((n * sum_of_population_squared - sum_of_population ** 2) * (n * sum_of_area_squared - sum_of_area ** 2)) ** 0.5

        if denominator == 0:
            
            return 0
        corr = round(numerator / denominator, 4)
        return corr
    return MaxMin(),stdvAverage(),density(),corr()


