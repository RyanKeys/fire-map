import json
import sys
# Parses CSV data from MODIS satellite and returns a list of json objects representing detected fires.
count = 0
fires = []
with open(sys.argv[1], "r") as fire_map:
    for fire in fire_map:
        data_list =fire.split(",")
        # id is formatted as f"{lat} {lng} {acq_date} {acq_time}"
        fires.append({"id":data_list[0]+"/" + data_list[1] + "/" + data_list[5] + "/" + data_list[6], "latitude":data_list[0], "longitude":data_list[1],"brightness":data_list[2],"scan":data_list[3],"track":data_list[4],"acq_date":data_list[5], "acq_time":data_list[6],"satellite":data_list[7],"confidence":data_list[8],"version":data_list[9], "bright_t31":data_list[10],"frp":data_list[11],"daynight":data_list[12]})
        count+=1
    fire_map.close()
with open('app.json', 'w') as f:
    f.write("[")
    for fire in fires:
        f.write(f"{json.dumps(fire)},") 
    f.write("]")
f.close()